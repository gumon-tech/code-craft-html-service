import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    description: 'image',
    example: '/products/06.jpg',
    required: false,
    default: '',
  })
  image: string;

  @ApiProperty({
    description: 'username',
    example: 'username',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    description: 'password',
    example: 'password',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;

  @ApiProperty({
    description: 'confirmPassword',
    example: 'password',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  confirmPassword: string;

  @ApiProperty({
    description: 'ชื่อ',
    example: 'ปณิจชัย',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @ApiProperty({
    description: 'นามสกุล',
    example: 'แจงเล็ก',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @ApiProperty({
    description: 'nickname',
    example: 'โอ',
    required: false,
  })
  nickname: string = '';

  @ApiProperty({
    description: 'email',
    example: 'email',
    required: false,
  })
  email: string = '';

  @ApiProperty({
    description: 'bio',
    example: {
      about:
        'Komphet Meesab, known as Kom, is a seasoned Technology Consultant with extensive experience in providing innovative tech solutions and strategic guidance to businesses. With a strong background in software development and systems integration, Kom excels at helping organizations navigate the complexities of modern technology landscapes.',
      skills: [
        'Software Development',
        'Systems Integration',
        'Cloud Computing',
        'Cybersecurity',
        'Enterprise Software',
        'Analytical Skills',
        'Problem-solving',
      ],
      experience: [
        {
          company: 'Tech Innovators Inc.',
          role: 'Senior Technology Consultant',
          duration: '2015 - 2017',
          projects: [
            {
              name: 'Cloud Migration Project',
              description:
                'Led a team of 10 engineers in migrating on-premises infrastructure to AWS, resulting in a 30% reduction in operational costs.',
            },
            {
              name: 'Enterprise CRM Implementation',
              description:
                'Managed the implementation of a CRM system for a Fortune 500 company, enhancing customer engagement and increasing sales by 15%.',
            },
          ],
        },
        {
          company: 'Global Solutions Ltd.',
          role: 'Lead Systems Integrator',
          duration: '2017 - 2019',
          projects: [
            {
              name: 'IoT Integration',
              description:
                'Integrated IoT solutions for smart manufacturing processes, improving efficiency by 25% and reducing downtime by 40%.',
            },
            {
              name: 'Cybersecurity Enhancement',
              description:
                'Developed and deployed a comprehensive cybersecurity framework for a financial institution, mitigating risks and ensuring compliance with regulatory standards.',
            },
          ],
        },
        {
          company: 'Innovative Tech Services',
          role: 'Technology Strategist',
          duration: '2019 - 2021',
          projects: [
            {
              name: 'Digital Transformation Initiative',
              description:
                'Orchestrated the digital transformation of a traditional retail business, implementing e-commerce solutions that boosted online sales by 50%.',
            },
            {
              name: 'Big Data Analytics',
              description:
                'Implemented big data analytics platforms for a healthcare provider, enabling predictive analytics and improving patient outcomes.',
            },
          ],
        },
      ],
      contact_information: {
        email: 'kom@example.com',
        phone: '+123-456-7890',
        linkedin: 'https://www.linkedin.com/in/komphet-meesab',
      },
    },
    required: false,
  })
  bio: object = {};
}
