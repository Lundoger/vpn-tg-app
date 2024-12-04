import playMarket from '../assets/installation/play-market.svg';
import appStore from '../assets/installation/app-store.svg';
import windows from '../assets/installation/windows.svg';
import apk from '../assets/installation/apk.svg';
import StepLayout from '../pages/installation-page/step-layout/StepLayout';

interface IInstallationLink {
  label: string;
  icon: string;
}

export const installationLinks: IInstallationLink[] = [
  { label: 'Play Market', icon: playMarket },
  { label: 'App Store', icon: appStore },
  { label: 'Windows', icon: windows },
  { label: 'APK', icon: apk },
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
