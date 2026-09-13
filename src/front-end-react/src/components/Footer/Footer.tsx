import './footer.css';
import github from '../../assets/github.png';
import linkedIn from '../../assets/linkedin.png';
import email from '../../assets/email.png';
import { useRef, type JSX } from "react";
import { Avatar } from 'primereact/avatar';

export default function Footer(): JSX.Element {
  const gitHubRef = useRef<HTMLAnchorElement>(null);
  const linkedInRef = useRef<HTMLAnchorElement>(null);
  const mailRef = useRef<HTMLAnchorElement>(null);

  function handleGitHubIconClick(_: React.MouseEvent<HTMLElement>): void {
    gitHubRef!.current!.click();
  }

  function handleLinkedInIconClick(_: React.MouseEvent<HTMLElement>): void {
    linkedInRef!.current!.click();
  }

  function handleEmailIconClick(_: React.MouseEvent<HTMLElement>): void {
    mailRef!.current!.click();
  }

  return <footer className='footer-container'>
    <p>Application authored by <b><i>Daniel Dianov, M.D.</i></b></p>
    <div className='contacts-container'>
      <span>Contacts:</span>
      <Avatar image={github} className='avatar' imageAlt='Github profile' onClick={(e) => handleGitHubIconClick(e)} />
      <Avatar image={linkedIn} className='avatar' imageAlt='LinkedIn profile' onClick={(e) => handleLinkedInIconClick(e)} />
      <Avatar image={email} className='avatar' imageAlt='Email' onClick={(e) => handleEmailIconClick(e)} />
      <a ref={gitHubRef} href="https://github.com/DDianovMD" target='_blank'></a>
      <a ref={linkedInRef} href="https://www.linkedin.com/in/ddianov/" target='_blank'></a>
      <a ref={mailRef} href="mailto:ddianovmd@abv.bg"></a>
    </div>
  </footer>
}