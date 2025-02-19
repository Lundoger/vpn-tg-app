import playMarket from '../assets/installation/play-market.svg';
import appStore from '../assets/installation/app-store.svg';
import windows from '../assets/installation/windows.svg';
import apk from '../assets/installation/apk.svg';
import StepLayout from '../pages/installation-page/step-layout/StepLayout';

interface IInstallationLink {
  label: string;
  icon: string;
  link: string;
}

export const installationLinks: IInstallationLink[] = [
  { label: 'Play Market', icon: playMarket, link: 'https://play.google.com/store/apps/details?id=org.outline.android.client' },
  { label: 'App Store', icon: appStore, link: 'https://apps.apple.com/us/app/outline-app/id1356177741' },
  { label: 'Windows', icon: windows, link: 'https://s3.amazonaws.com/outline-releases/client/windows/stable/Outline-Client.exe' },
];

export const steps = [
  {
    title: 'Этап - 1',
    content: <StepLayout.Step1 />,
  },
  {
    title: 'Этап - 2',
    content: <StepLayout.Step2 />,
  },
  {
    title: 'Этап - 3',
    content: <StepLayout.Step3 />,
  },
  {
    title: 'Этап - 4',
    content: <StepLayout.Step4 />,
  },
  {
    title: 'Этап - 5',
    content: <StepLayout.Step5 />,
  },
  {
    title: 'Подключение',
    content: <StepLayout.Connection />,
  },
];
