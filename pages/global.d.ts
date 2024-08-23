interface Window {
    turnstile: {
      render: (element: HTMLElement, options: { sitekey: string; callback: (token: string) => void }) => void;
    };
  }