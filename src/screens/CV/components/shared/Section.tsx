import classNames from 'classnames';

export const Section = (props: React.ComponentPropsWithoutRef<'section'>) => (
  <section className="mb-4" {...props} />
);

export const SectionTitle = (props: React.ComponentPropsWithoutRef<'h2'>) => (
  <h2
    className="font-serif text-xl md:text-2xl font-bold border-b"
    {...props}
  />
);

export const SectionBody = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => (
  <>
    <div
      className={classNames([
        'text-base md:text-lg py-3 md:py-4',
        'sectionBody',
        className,
      ])}
      {...props}
    />
    <style global jsx>{`
      .sectionBody p:not(:last-child) {
        margin-bottom: 1rem !important;
      }
    `}</style>
  </>
);
