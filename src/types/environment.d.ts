declare global {
   namespace NodeJS {
      interface ProcessEnv {
         PORT: number;
         HOST: string;
         LOG_FILE: string;
      }
   }
}

export {};
