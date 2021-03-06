import { Container } from '@components/Ui';
import { ChevronDownIcon } from '@raulfdm/blog-components';
import { RelevantPostSerieData } from '@screens/Blog/utils/series';
import { useMachine } from '@xstate/react/lib/fsm';
import { default as classnames, default as classNames } from 'classnames';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { createMachine } from '@xstate/fsm';

const variants = {
  list: {
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        restDelta: 2,
        staggerChildren: 0.07,
        stiffness: 40,
        type: 'spring',
      },
    },
    collapsed: {
      opacity: 0,
      height: 0,
      transition: {
        damping: 40,
        delay: 0.6,
        staggerChildren: 0.05,
        staggerDirection: -1,
        stiffness: 400,
        type: 'spring',
      },
    },
  },
  item: {
    expanded: {
      y: 0,
      height: 'auto',
      opacity: 1,
      transition: {
        stiffness: 1000,
        velocity: -200,
      },
    },
    collapsed: {
      y: 50,
      height: 0,
      opacity: 0,
      transition: {
        stiffness: 1000,
      },
    },
  },
};

const seriesMachine = createMachine<never, SeriesMachineEvent>({
  initial: 'collapsed',
  states: {
    collapsed: {
      on: {
        TOGGLE: 'expanded',
      },
    },
    expanded: {
      on: {
        TOGGLE: 'collapsed',
        CLOSE: 'collapsed',
      },
    },
  },
});

export const SeriesSection: React.FC<SeriesSectionProps> = ({
  series,
  currentPostId,
}) => {
  const [current, send] = useMachine(seriesMachine);
  const { name, posts, amount } = series;
  const currentState = current.value as SeriesMachineState;

  const toggleSection = () => send('TOGGLE');

  return (
    <Container data-testid="series-section" as="section">
      <div
        className={classNames([
          'relative',
          ' bg-white dark:bg-blue-800',
          'rounded',
          'shadow',
          'my-5',
          'transition-theme duration-200 ease',
        ])}
        data-testid="series-menu"
      >
        <div>
          <Header
            toggleSection={toggleSection}
            name={name}
            currentState={currentState}
          />
          <motion.ul
            className="m-0"
            initial={false}
            animate={currentState}
            variants={variants.list}
            data-testid="series-post-list"
          >
            {posts.map((post) => {
              const { id, copy, uri } = post;
              const isCurrentPost = id === currentPostId;
              return (
                <motion.li
                  className={classnames([
                    'cursor-pointer',
                    'm-0 p-b',
                    'font-sans text-sm md:text-base',
                    isCurrentPost
                      ? 'bg-green-400'
                      : 'hover:bg-green-400 hover:bg-opacity-50',
                  ])}
                  key={id}
                  data-testid={`post_${id}`}
                  variants={variants.item}
                >
                  <Link href={uri}>
                    <a className="block no-underline px-4 py-3">{copy}</a>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
          <Footer
            currentState={currentState}
            toggleSection={toggleSection}
            amount={amount}
          />
        </div>
      </div>
    </Container>
  );
};

const Header = ({ toggleSection, name, currentState }: HeaderProps) => {
  return (
    <div
      className={classnames([
        'flex content-between',
        'cursor-pointer',
        'py-3 px-4',
        'font-serif text-lg md:text-xl font-bold',
        'transition-spacing duration-300',
        currentState === 'expanded'
          ? 'pb-2.5 border-b border-gray-100 dark:border-gray-600'
          : 'pb-0 border-none',
      ])}
      onClick={toggleSection}
      data-testid="expand-button"
    >
      <span className="flex-1">{name}</span>
      <motion.button
        className="flex items-center justify-center w-7 h-7"
        initial="collapsed"
        animate={currentState}
        variants={{
          expanded: { rotate: '0deg' },
          collapsed: { rotate: '180deg' },
        }}
      >
        <ChevronDownIcon className="w-5" />
      </motion.button>
    </div>
  );
};

const Footer = ({ amount, toggleSection, currentState }: FooterProps) => {
  return (
    <div
      onClick={toggleSection}
      className={classnames([
        'flex content-between',
        'cursor-pointer',
        'py-3 px-4',
        'text-sm md:text-base font-sans',
        ' transition-spacing duration-300',
        currentState === 'expanded'
          ? 'pt-2.5 border-t border-gray-100 dark:border-gray-600'
          : 'pt-0 border-none',
      ])}
    >
      <span>
        <FormattedMessage
          id="series.sectionDescription"
          values={{
            seriesAmount: amount,
          }}
        />
      </span>
    </div>
  );
};

type FooterProps = Pick<HeaderProps, 'toggleSection' | 'currentState'> & {
  amount: number;
};

type HeaderProps = {
  toggleSection: () => void;
  name: string;
  currentState: SeriesMachineState;
};

interface SeriesSectionProps {
  currentPostId: string;
  series: RelevantPostSerieData;
  divider?: boolean;
}

type SeriesMachineEvent =
  | {
      type: 'TOGGLE';
    }
  | { type: 'CLOSE' };

type SeriesMachineState = 'expanded' | 'collapsed';
