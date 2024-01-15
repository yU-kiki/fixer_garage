'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // ページを読み込んだ時に /unknownbikesjp にリダイレクトする
    router.push('/unknownbikesjp');
  }, [router]);

  return <></>;
}
