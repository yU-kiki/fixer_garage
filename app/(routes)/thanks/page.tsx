import clsx from 'clsx';

import { Title } from '@/_components/elements/Title';

export default function Thanks() {
  return (
    <div
      className={clsx(
        'mt-[32px]',
        'w-full',
        'md:w-[576px]',
        'px-[16px]',
        'md:px-[32px]',
      )}
    >
      <Title title="ご注文ありがとうございました" />
      <div className={clsx('px-[16px]', 'py-[48px]')}>
        <p>
          この度はご注文いただき、
          <br />
          誠にありがとうございました。
          <br />
          <br />
          お支払いや配送につきましては、
          <br />
          メールにてご案内させていただきます。
          <br />
          引き続きよろしくお願いいたします。
        </p>
      </div>
    </div>
  );
}
