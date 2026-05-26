import { Component } from '@angular/core';
import {
  HERO_SHOWCASE,
  IQ_WORLD_IMAGE,
  IQ_WORLD_LINK,
  TECHNOLOGY_HERO_IMAGE,
  TECHNOLOGY_MOBILE_IMAGE
} from '../../data/site-data';

interface TechnologyFeatureCard {
  title: string;
  description: string;
  image: string;
  alt: string;
}

interface TechnologyInsightRow {
  title: string;
  description: string;
  image: string;
  alt: string;
  copyFirst?: boolean;
  variant?: 'default' | 'phone';
}

@Component({
  selector: 'app-technology-page',
  templateUrl: './technology-page.component.html',
  styleUrls: ['./technology-page.component.scss']
})
export class TechnologyPageComponent {
  readonly heroShowcase = TECHNOLOGY_HERO_IMAGE;
  readonly iqWorldLink = IQ_WORLD_LINK;

  readonly displayFeatures: TechnologyFeatureCard[] = [
    {
      title: 'Resolution Redefined',
      description:
        `Elevate your viewing experience with IPS Panel's HD brilliance or dive into the future with 4K resolution support, exclusively available in our 50", 55" and above screen sizes. LUMOCAST Display ensures every detail is brought to life on your screen.`,
      image: './assets/canfashion-1.png',
      alt: 'LUMOCAST display installed in a premium retail environment'
    },
    {
      title: 'Panoramic Precision',
      description:
        'Enjoy a mesmerizing 178-degree vision angle, allowing you to capture every detail from any corner of the room. Immerse yourself in a display that goes beyond the ordinary.',
      image: './assets/pngconvert.png',
      alt: 'LUMOCAST digital signage menu display with wide viewing angle'
    }
  ];

  readonly utilityFeatures: TechnologyFeatureCard[] = [
    {
      title: 'Versatility In Orientation',
      description:
        'Choose your style with LUMOCAST Display - available in both vertical and horizontal orientations. Tailor your visual setup to match your unique space and preferences.',
       image: './assets/can 20.png',
      alt: 'LUMOCAST display shown in both vertical and horizontal orientations'
    },
    {
      title: 'Sleek Remote Control',
      description:
        'Take command with our sleek remote control, designed for convenience. Operate basic functions effortlessly, ensuring your LUMOCAST Display experience is as smooth as the visuals it delivers.',
      image: './assets/remote1.png',
      // image: 'https://static.wixstatic.com/media/157f6f_8c90256477534a2eaaa712cb92b71fd2~mv2.png/v1/fill/w_1184,h_681,al_c,q_90,enc_avif,quality_auto/remote.png',
      alt: 'Remote control used with a LUMOCAST digital signage display'
    }
  ];

  readonly iqWorldLead =
    `Empower yourself with the IQ World app's robust features. Manage screens efficiently with admin control, while clients enjoy a seamless viewing experience. It's control at your fingertips.`;

  readonly iqWorldRows: TechnologyInsightRow[] = [
    {
      title: 'Real-Time Information',
      description:
        `A cloud-based software that give you a centralised control hub to monitor multiple screens effortlessly from a single point, giving you unparalleled control. Feature rich application with schedule management, split-screen options, text scrolling, inbuilt image and video editing, and more. It's a suite of tools designed to enhance your experience with security.`,
      image: 'https://static.wixstatic.com/media/157f6f_38377ec2af4145e7b92093b3599d2eb0~mv2.png/v1/fill/w_1240,h_855,al_c,q_90,enc_avif,quality_auto/iqscreens.png',
      alt: 'IQ World dashboard across laptop, desktop, tablet, and mobile'
    },
    {
      title: 'Total Control',
      description:
        'Experience unparalleled convenience with IQ Word Mobile App - your on-the-go command center. Effortlessly manage tasks, run the schedule, and more with just a tap. Simplify your life, anytime, anywhere.',
      image: './assets/mobileapp.png',

      alt: 'IQ World app shown on a mobile phone',
      copyFirst: true,
      variant: 'phone'
    }
  ];
}
