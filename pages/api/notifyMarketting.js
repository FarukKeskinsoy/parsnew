
import emailjs from "@emailjs/browser";


export default async function sendEmailtoMarketting (req,res) {
  var templateParams = {
    title:"Marketting",
    name: 'Test',
    message:"Bu denemedir",
    notes: 'Check this out!',
    email:"farukkeskinsoy88@gmail.com"
  };
  
  emailjs
    .send(
      "service_nh2egkq",
      "template_kbr0bd8",
      form.current,
      "az39-SQ3JNFE4N2sA"
    )
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    )
};