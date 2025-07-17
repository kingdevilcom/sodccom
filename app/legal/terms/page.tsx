import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Anchor, ScrollText } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <ScrollText className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Terms of Sail
          </h1>
          <p className="text-muted-foreground">
            The code that governs our digital seas
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Anchor className="h-6 w-6 mr-2" />
              Terms of Service
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using Steal Or Die Cloud™ services, you agree to be bound by these Terms of Sail. 
                If you do not agree to these terms, you shall not use our services.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Service Description</h2>
              <p className="text-muted-foreground">
                Steal Or Die Cloud™ provides web hosting services including but not limited to:
              </p>
              <ul className="list-disc ml-6 mt-2 text-muted-foreground">
                <li>Minecraft server hosting</li>
                <li>Virtual Private Server (VPS) hosting</li>
                <li>VLSS hosting services</li>
                <li>V2Ray data protocols</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Account Responsibilities</h2>
              <p className="text-muted-foreground">
                You are responsible for maintaining the confidentiality of your account credentials and 
                for all activities that occur under your account. You must immediately notify us of any 
                unauthorized use of your account.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Acceptable Use Policy</h2>
              <p className="text-muted-foreground">
                You agree not to use our services for any unlawful purpose or in any way that could 
                damage, disable, or impair our services. Prohibited activities include but are not limited to:
              </p>
              <ul className="list-disc ml-6 mt-2 text-muted-foreground">
                <li>Illegal activities or content</li>
                <li>Spamming or sending unsolicited messages</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Distributing malware or harmful code</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Payment Terms</h2>
              <p className="text-muted-foreground">
                All payments are processed through PayHere. Services are billed monthly in advance. 
                Failure to pay may result in service suspension or termination.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Service Availability</h2>
              <p className="text-muted-foreground">
                We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. 
                Scheduled maintenance will be announced in advance when possible.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Steal Or Die Cloud™ shall not be liable for any indirect, incidental, special, or 
                consequential damages arising from the use of our services.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Termination</h2>
              <p className="text-muted-foreground">
                We reserve the right to terminate or suspend your account at any time for violation 
                of these terms or for any other reason at our sole discretion.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We may modify these terms at any time. Continued use of our services constitutes 
                acceptance of the modified terms.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these terms, please contact us at crew@stealordiecloud.com
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}