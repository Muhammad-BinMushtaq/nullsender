import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      {/* Email Preview Text */}
      <Preview>Here&apos;s your verification code: {otp}</Preview>

      {/* Email Content Section */}
      <Section style={{ padding: '20px 0' }}>
        <Row>
          <Heading as="h2" style={{ fontSize: '24px', marginBottom: '10px' }}>
            Hello {username},
          </Heading>
        </Row>

        <Row>
          <Text style={{ fontSize: '16px', lineHeight: '24px' }}>
            Thank you for registering with us. Please use the verification code below to complete your registration:
          </Text>
        </Row>

        <Row>
          <Text
            style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#4A00E0',
              padding: '10px 0',
              letterSpacing: '2px',
            }}
          >
            {otp}
          </Text>
        </Row>

        <Row>
          <Text style={{ fontSize: '14px', color: '#666' }}>
            If you did not request this code, you can safely ignore this email.
          </Text>
        </Row>

        {/* Optional Future Button (Commented) */}
        {/* 
      <Row>
        <Button
          href={`http://localhost:3000/verify/${username}`}
          style={{
            backgroundColor: '#4A00E0',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '6px',
            textDecoration: 'none',
            display: 'inline-block',
            marginTop: '20px',
          }}
        >
          Verify here
        </Button>
      </Row> 
      */}
      </Section>
    </Html>
  );

}