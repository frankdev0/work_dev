import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import Script from 'next/script';
import { useRouter } from "next/router";


const inter = Inter({ subsets: ["latin"] });


export default function Home() {


  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const turnstileRef = useRef<HTMLDivElement>(null);
  const tokenInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (turnstileRef.current && turnstileLoaded) {
      const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
      if (typeof sitekey !== 'string') {
        throw new Error('NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set');
      }
  
      window.turnstile.render(turnstileRef.current, {
        sitekey,
        callback: (token: string) => {
          if (tokenInputRef.current) {
            tokenInputRef.current.value = token;
            setIsVerified(true);
          }
        },
      });
    }
  }, [turnstileLoaded]);

  
  useEffect(() => {
    if (isVerified) {
      router.push('/authorization/signin')
        .then(success => {
          console.log('Navigation success:', success);
        })
        .catch(error => {
          console.error('Navigation error:', error);
        });
    }
  }, [isVerified, router]);
 
  

  return (
    <>
    <Script 
    src='https://challenges.cloudflare.com/turnstile/v0/api.js'
    onLoad={() => setTurnstileLoaded(true)}
    />
     
      <main className={`${styles.main} ${inter.className}`}>

        <div className="text-center">
          <small>Verifying your browser to ensure secure access</small>
          <div>
              
              <div
                // className="cf-turnstile"
                data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                ref={turnstileRef}
              ></div>
                <input type="hidden" ref={tokenInputRef} name="cf-turnstile-response" />
            </div>
        </div>

      
     
      </main>
      
    </>
  );
}
