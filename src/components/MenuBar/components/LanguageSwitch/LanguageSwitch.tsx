import { Language } from '@styled-icons/material/Language';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';

import { useLocalization } from '@hooks/useLocalization';
import { DropdownMenu, DropdownMenuItem } from '@components/DropdownMenu';
import { MenuButton } from '@components/MenuBar';

export const LanguageSwitch: React.FC = () => {
  const { switchToEnglish, switchToPortuguese } = useLocalization();
  const { pathname } = useRouter();

  /**
   * Having this option in a post Page leads into an undesired behaviour.
   *
   * Not all posts has translations. It means that if the user try to switch
   * locale in a post which does not its equivalent in the selected language,
   * it'll throw redirects the user to a 404 page.
   *
   * For handling posts translations I have the "AvailableTranslations" component
   * which allow the user know when this post has translations available and also
   * redirects he/she for the correct page
   */
  if (pathname.includes('/blog/')) {
    return null;
  }

  return (
    <DropdownMenu
      items={
        <>
          <DropdownMenuItem
            onClick={switchToEnglish}
            data-testid="language__english"
          >
            <FormattedMessage id="languages.en" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={switchToPortuguese}
            data-testid="language__portuguese"
          >
            <FormattedMessage id="languages.pt" />
          </DropdownMenuItem>
        </>
      }
    >
      {({ toggleDropdown }) => {
        return (
          <MenuButton onClick={toggleDropdown} data-testid="language-menu">
            <Language size={21} />
          </MenuButton>
        );
      }}
    </DropdownMenu>
  );
};
