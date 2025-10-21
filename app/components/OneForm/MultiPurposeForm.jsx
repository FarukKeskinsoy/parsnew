import { iller } from '@/lib/data/sehirler';
import { useProducts } from '@/lib/firebase/product/read';
import { useServiceTypes } from '@/lib/firebase/sector/read';
import React from 'react';
import Link from 'next/link';
import { Launch } from '@mui/icons-material';
import "./form.scss";

/** Basit ama sağlam e-posta kontrolü */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Türkiye dostu telefon (0, +90, boşluk/()/- serbest; en az 10 rakam) */
const TR_PHONE_RE = /^(?:\+?90|0)?[\s()-]*\d{3}[\s()-]*\d{3}[\s()-]*\d{2}[\s()-]*\d{2}$/;

const TR_MOBILE_RE = /^(?:\+?90|0)?5\d{9}$/; // +90/0 opsiyonel, 5 ile başlar, toplam 10–11 rakam
function normalizeDigits(v) {
    // tüm rakamları al
    return (v || "").replace(/\D+/g, "");
}

function formatTRMobilePretty(v) {
    // "0 5XX XXX XX XX" görünümü
    const d = normalizeDigits(v);
    // başta 90 varsa 0’a çevir
    const dd = d.startsWith("90") ? "0" + d.slice(2) : d;
    // başta 5 ile başlıyorsa başına 0 ekle
    const withLeading0 = dd.startsWith("5") ? "0" + dd : dd;

    // 0XXXXXXXXXX (11 hane) için parçala
    const p1 = withLeading0.slice(0, 4);      // 0 5xx
    const p2 = withLeading0.slice(4, 7);      // xxx
    const p3 = withLeading0.slice(7, 9);      // xx
    const p4 = withLeading0.slice(9, 11);     // xx

    if (withLeading0.length <= 4) return withLeading0;
    if (withLeading0.length <= 7) return `${p1} ${p2}`;
    if (withLeading0.length <= 9) return `${p1} ${p2} ${p3}`;
    return `${p1} ${p2} ${p3} ${p4}`.trim();
}


export default function MultiPurposeForm({
    formData,
    isLoading,
    error,
    isDone,
    onSubmit,
    handleData,
    route,
    slug,
    title,
    isId,
    varsaTitle,
}) {
    const { data: products } = useProducts();
    const { dataS: services } = useServiceTypes();

    const [errors, setErrors] = React.useState({});
    const fieldRefs = React.useRef({});

    const setFieldRef = (name) => (el) => {
        fieldRefs.current[name] = el;
    };

    const setError = (name, message) =>
        setErrors((prev) => ({ ...prev, [name]: message }));
    const clearError = (name) =>
        setErrors((prev) => {
            const c = { ...prev };
            delete c[name];
            return c;
        });

    function validateField(name, value) {
        switch (name) {
            case "userName":
                if (!value || String(value).trim().length < 2) return "Lütfen ad soyad bilgisini en az 2 karakter olacak şekilde giriniz.";
                return null;
            case "email":
                if (!value) return "Lütfen e-posta adresinizi giriniz.";
                if (!EMAIL_RE.test(String(value).trim())) return "Geçerli bir e-posta adresi giriniz.";
                return null;
            case "phone":
                if (!value) return "Lütfen telefon numaranızı giriniz.";
                if (!TR_PHONE_RE.test(String(value).replace(/\s+/g, ""))) return "Geçerli bir telefon numarası giriniz. Örn: 0XXX XXX XX XX / +90 XXX XXX XX XX";
                return null;
            case "firmName":
                if (!value || String(value).trim().length < 2) return "Lütfen firma/kurum adını giriniz.";
                return null;
            case "city":
                if (!value) return "Lütfen bir şehir seçiniz.";
                return null;
            case "relatedId":
                if (slug === "urunler" && !value) return "Lütfen bir ürün seçiniz.";
                if (slug === "servis" && !value) return "Lütfen bir servis seçiniz.";
                return null;
            case "message":
                // mesaj zorunlu görünüyordu; istersen minLength arttırabilirsin
                if (!value || String(value).trim().length < 10) return "Lütfen en az 10 karakterden oluşan bir mesaj yazınız.";
                return null;
            case "kvkk":
                if (!value) return "KVKK koşullarını onaylamadan devam edemezsiniz.";
                return null;
            default:
                return null;
        }
    }

    function validateAll() {
        const requiredKeys = ["userName", "email", "phone", "firmName", "city", "message", "kvkk"];
        const dynamicKey = "relatedId";

        const nextErrors = {};
        for (const k of requiredKeys) {
            const msg = validateField(k, k === "kvkk" ? !!formData?.kvkk : formData?.[k]);
            if (msg) nextErrors[k] = msg;
        }
        if ((slug === "urunler" || slug === "servis")) {
            const msgR = validateField(dynamicKey, formData?.[dynamicKey]);
            if (msgR) nextErrors[dynamicKey] = msgR;
        }

        setErrors(nextErrors);

        // hata varsa ilkine scroll
        const firstKey = Object.keys(nextErrors)[0];
        if (firstKey) {
            fieldRefs.current[firstKey]?.scrollIntoView({ behavior: "smooth", block: "center" });
            fieldRefs.current[firstKey]?.focus();
            return false;
        }
        return true;
    }

    const onFieldChange = (name) => (e) => {
        clearError(name);
        const val = name === "kvkk" ? e?.target.checked : e.target.value;
        handleData(name, val);
    };

    const onFieldBlur = (name) => (e) => {
        const val = name === "kvkk" ? e.target.checked : e.target.value;
        const msg = validateField(name, val);
        if (msg) setError(name, msg);
        else clearError(name);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateAll()) return;
        onSubmit(route, title);
    };

    return (
        <form className="w-full max-w-lg items-center justify-center" onSubmit={handleSubmit} noValidate>
            <h1 className="font-bold mb-3 lg:text-xl">
                {varsaTitle ? "Servis " : !isId && title + " "}Talep Formu
            </h1>
            <p className="mb-3 text-sm text-gray-600">
                {varsaTitle ? "Servis " : !isId && title + " "}
                Talebinizi işleme alabilmemiz için lütfen aşağıdaki alanları doldurunuz.
            </p>

            {/* Ad Soyad + E-posta */}
            <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                    <label htmlFor="userName" className="block tracking-wide text-gray-700 text-xs font-neutral-600 mb-2">
                        İsim/Soyisim<span className="text-red-500">*</span>
                    </label>
                    <input
                        ref={setFieldRef("userName")}
                        id="userName"
                        name="userName"
                        placeholder="isim soyisim"
                        type="text"
                        autoComplete="name"
                        inputMode="text"
                        className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${errors.userName ? "border-red-500" : "border-gray-200 focus:border-gray-500"}`}
                        onChange={onFieldChange("userName")}
                        onBlur={onFieldBlur("userName")}
                        value={formData?.userName || ""}
                        required
                        aria-invalid={!!errors.userName}
                        aria-describedby={errors.userName ? "err-userName" : undefined}
                    />
                    {errors.userName && <p id="err-userName" className="mt-1 text-xs text-red-600">{errors.userName}</p>}
                </div>

                <div className="w-full md:w-1/2 px-3">
                    <label htmlFor="email" className="block tracking-wide text-gray-700 text-xs font-neutral-600 mb-2">
                        E-Posta<span className="text-red-500">*</span>
                    </label>
                    <input
                        ref={setFieldRef("email")}
                        id="email"
                        name="email"
                        placeholder="e-posta"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${errors.email ? "border-red-500" : "border-gray-200 focus:border-gray-500"}`}
                        onChange={onFieldChange("email")}
                        onBlur={onFieldBlur("email")}
                        value={formData?.email || ""}
                        required
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "err-email" : undefined}
                    />
                    {errors.email && <p id="err-email" className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
            </div>

            {/* Telefon + Firma */}
            <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                    {/* Telefon */}
                    <label htmlFor="phone" className="block tracking-wide text-gray-700 text-xs font-neutral-600 mb-2">
                        Telefon<span className="text-red-500">*</span>
                    </label>
                    <input
                        ref={setFieldRef("phone")}
                        id="phone"
                        name="phone"
                        placeholder="0530 123 45 67"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        // sadece sayılar (ve kopyala-yapıştır sanitizasyonu)
                        onKeyDown={(e) => {
                            const allowedKeys = [
                                "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Home", "End",
                                " ", // boşluk
                            ];
                            if (
                                allowedKeys.includes(e.key) ||
                                (e.ctrlKey || e.metaKey) // kısayollar (cmd/ctrl + c/v/a/x)
                            ) return;

                            if (!/^\d$/.test(e.key)) e.preventDefault();
                        }}
                        onPaste={(e) => {
                            e.preventDefault();
                            const t = e.clipboardData.getData("text");
                            const digits = normalizeDigits(t);
                            handleData("phone", formatTRMobilePretty(digits));
                            clearError?.("phone"); // varsa senin clearError fonksiyonun
                        }}
                        className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${errors.phone ? "border-red-500" : "border-gray-200 focus:border-gray-500"}`}
                        onChange={(e) => {
                            const pretty = formatTRMobilePretty(e.target.value);
                            handleData("phone", pretty);
                            if (errors.phone) clearError?.("phone");
                        }}
                        onBlur={(e) => {
                            const raw = normalizeDigits(e.target.value);
                            // 90 ile başlıyorsa +90… kabul; değilse 0… kabul
                            const rawForCheck = raw.startsWith("90") ? "+" + raw : (raw.startsWith("0") ? raw : "0" + raw);
                            if (!TR_MOBILE_RE.test(rawForCheck)) {
                                setError?.("phone", "Geçerli bir mobil telefon numarası giriniz. Örn: 0530 123 45 67");
                            } else {
                                clearError?.("phone");
                                // blur’da nihai pretty formatı koru
                                handleData("phone", formatTRMobilePretty(rawForCheck));
                            }
                        }}
                        value={formData?.phone || ""}
                        required
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "err-phone" : undefined}
                    />
                    {errors.phone && <p id="err-phone" className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                </div>

                <div className="w-full md:w-1/2 px-3">
                    <label htmlFor="firmName" className="block tracking-wide text-gray-700 text-xs font-neutral-600 mb-2">
                        Firma/Kurum Adı<span className="text-red-500">*</span>
                    </label>
                    <input
                        ref={setFieldRef("firmName")}
                        id="firmName"
                        name="firmName"
                        placeholder="firma/kurum adı"
                        type="text"
                        autoComplete="organization"
                        inputMode="text"
                        className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${errors.firmName ? "border-red-500" : "border-gray-200 focus:border-gray-500"}`}
                        onChange={onFieldChange("firmName")}
                        onBlur={onFieldBlur("firmName")}
                        value={formData?.firmName || ""}
                        required
                        aria-invalid={!!errors.firmName}
                        aria-describedby={errors.firmName ? "err-firmName" : undefined}
                    />
                    {errors.firmName && <p id="err-firmName" className="mt-1 text-xs text-red-600">{errors.firmName}</p>}
                </div>
            </div>

            {/* Şehir */}
            <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                    <label htmlFor="city" className="block tracking-wide text-gray-700 text-xs font-neutral-600 mb-2">
                        Şehir<span className="text-red-500">*</span>
                    </label>
                    <select
                        ref={setFieldRef("city")}
                        id="city"
                        name="city"
                        className={`block appearance-none w-full bg-gray-200 border text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white ${errors.city ? "border-red-500" : "border-gray-200 focus:border-gray-500"}`}
                        onChange={onFieldChange("city")}
                        onBlur={onFieldBlur("city")}
                        value={formData?.city || ""}
                        required
                        autoComplete="address-level1"
                        aria-invalid={!!errors.city}
                        aria-describedby={errors.city ? "err-city" : undefined}
                    >
                        <option value="" disabled hidden>lütfen şehir seçiniz</option>
                        {iller?.map((i, idx) => (
                            <option key={idx} value={i}>{i}</option>
                        ))}
                    </select>
                    {errors.city && <p id="err-city" className="mt-1 text-xs text-red-600">{errors.city}</p>}
                </div>
            </div>

            {/* Ürün/Servis seçimi */}
            {slug === "urunler" && (
                <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full px-3">
                        <label htmlFor="relatedId" className="block tracking-wide text-gray-700 text-xs font-neutral-600 mb-2">
                            Cihaz<span className="text-red-500">*</span>
                        </label>
                        <select
                            ref={setFieldRef("relatedId")}
                            id="relatedId"
                            name="relatedId"
                            className={`block appearance-none w-full bg-gray-200 border text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white ${errors.relatedId ? "border-red-500" : "border-gray-200 focus:border-gray-500"}`}
                            onChange={onFieldChange("relatedId")}
                            onBlur={onFieldBlur("relatedId")}
                            value={formData?.relatedId || ""}
                            required
                        >
                            <option value="" disabled hidden>lütfen ürün seçiniz</option>
                            {products?.map((p, idx) => (
                                <option key={idx} value={p.id}>{p.title}</option>
                            ))}
                        </select>
                        {errors.relatedId && <p className="mt-1 text-xs text-red-600">{errors.relatedId}</p>}
                    </div>
                </div>
            )}

            {slug === "servis" && (
                <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full px-3">
                        <label htmlFor="relatedId" className="block tracking-wide text-gray-700 text-xs font-neutral-600 mb-2">
                            Servis<span className="text-red-500">*</span>
                        </label>
                        <select
                            ref={setFieldRef("relatedId")}
                            id="relatedId"
                            name="relatedId"
                            className={`block appearance-none w-full bg-gray-200 border text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white ${errors.relatedId ? "border-red-500" : "border-gray-200 focus:border-gray-500"}`}
                            onChange={onFieldChange("relatedId")}
                            onBlur={onFieldBlur("relatedId")}
                            value={formData?.relatedId || ""}
                            required
                        >
                            <option value="" disabled hidden>lütfen servis seçiniz</option>
                            {services?.map((s, idx) => (
                                <option key={idx} value={s.id}>{s.title}</option>
                            ))}
                        </select>
                        {errors.relatedId && <p className="mt-1 text-xs text-red-600">{errors.relatedId}</p>}
                    </div>
                </div>
            )}

            {/* Mesaj */}
            <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                    <label htmlFor="message" className="block tracking-wide text-gray-700 text-xs font-neutral-600 mb-2">
                        Mesajınız<span className="text-red-500">*</span>
                    </label>
                    <textarea
                        ref={setFieldRef("message")}
                        id="message"
                        name="message"
                        rows={8}
                        placeholder="mesajınız"
                        className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white resize-none ${errors.message ? "border-red-500" : "border-gray-200 focus:border-gray-500"}`}
                        onChange={onFieldChange("message")}
                        onBlur={onFieldBlur("message")}
                        value={formData?.message || ""}
                        required
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "err-message" : undefined}
                    />
                    <p className="mt-1 text-[11px] text-gray-500">En az 10 karakter giriniz.</p>
                    {errors.message && <p id="err-message" className="mt-1 text-xs text-red-600">{errors.message}</p>}
                </div>
            </div>

            {/* KVKK */}
            <div className="flex flex-wrap -mx-3 mb-3 items-center gap-2 px-3">
                <input
                    ref={setFieldRef("kvkk")}
                    id="kvkk"
                    name="kvkk"
                    type="checkbox"
                    onChange={onFieldChange("kvkk")}
                    onBlur={onFieldBlur("kvkk")}
                    checked={!!formData?.kvkk}
                    required
                    aria-invalid={!!errors.kvkk}
                    aria-describedby={errors.kvkk ? "err-kvkk" : undefined}
                />
                <label htmlFor="kvkk" className="block tracking-wide text-gray-700 text-xs font-neutral-600">
                    <Link target="_blank" className="hover:text-blue-500 hover:decoration-inherit flex items-center gap-2" href={"/kvkk"}>
                        Kvkk koşullarını onaylıyorum. <Launch />
                    </Link>
                </label>
                {errors.kvkk && <p id="err-kvkk" className="ml-2 text-xs text-red-600">{errors.kvkk}</p>}
            </div>

            {/* Genel hata + Submit */}
            {error && <p className="text-red-500 text-sm px-3">{error}</p>}

            {!isDone ? (
                <button
                    disabled={isLoading || isDone}
                    type="submit"
                    className="bg-black rounded-full px-4 py-2 text-white disabled:opacity-60"
                >
                    {isLoading ? "Gönderiliyor…" : "Gönder"}
                </button>
            ) : (
                <h3 className="text-green-600 font-medium">Form başarıyla gönderildi!</h3>
            )}
        </form>
    );
}
