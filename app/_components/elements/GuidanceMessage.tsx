import clsx from 'clsx';
import Link from 'next/link';

interface GuidanceMessageProps {
  message: string;
  actionText: string;
  actionLink: string;
}

export const GuidanceMessage = ({
  message,
  actionText,
  actionLink,
}: GuidanceMessageProps) => {
  return (
    <div className={clsx('py-[48px]', 'text-center')}>
      <p className={clsx('mb-[8px]', 'font-semibold', 'text-[16px]')}>
        {message}
      </p>
      <Link href={actionLink} className={clsx('inline-block', 'underline')}>
        {actionText}
      </Link>
    </div>
  );
};
