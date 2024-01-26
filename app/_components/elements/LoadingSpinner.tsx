import clsx from 'clsx';
import '@/_common/styles/loading.css';

export const LoadingSpinner = () => {
  return (
    <div
      className={clsx(
        'fixed inset-0 flex justify-center items-center bg-white',
        'pt-[90px]',
      )}
    >
      <div
        className="w-10 h-10 relative"
        style={{ transform: 'translateY(-50%)' }}
      >
        <div
          className={clsx(
            'w-full h-full rounded-full bg-black opacity-60 absolute top-0 left-0 animate-bounce',
          )}
        ></div>
        <div
          className={clsx(
            'w-full h-full rounded-full bg-black opacity-60 absolute top-0 left-0 animate-bounce',
          )}
        ></div>
      </div>
    </div>
  );
};
