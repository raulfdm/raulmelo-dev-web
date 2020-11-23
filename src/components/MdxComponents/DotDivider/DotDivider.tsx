export const DotDivider = (props: React.ComponentPropsWithoutRef<'hr'>) => (
  <>
    <hr className="relative italic text-2xl" {...props} />
    <style jsx>{`
      hr {
        border-color: transparent;
        position: relative;
      }
      hr::before {
        content: '...';
        letter-spacing: 0.6em;
        position: absolute;
        top: -26px;
        right: calc(50% - 32px);
      }
    `}</style>
  </>
);
