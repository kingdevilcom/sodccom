import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Scale, AlertTriangle } from 'lucide-react'

export default function AUPPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Scale className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Code of Conduct
          </h1>
          <p className="text-muted-foreground">
            The pirate's code for acceptable use
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2" />
              Acceptable Use Policy
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. General Principles</h2>
              <p className="text-muted-foreground">
                This Acceptable Use Policy governs your use of Steal Or Die Cloud™ services. 
                By using our services, you agree to comply with this policy and all applicable laws.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Prohibited Activities</h2>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">Illegal Activities</h3>
                  <ul className="list-disc ml-6 text-red-700 text-sm space-y-1">
                    <li>Any activity that violates local, state, national, or international laws</li>
                    <li>Copyright infringement or intellectual property violations</li>
                    <li>Distribution of illegal content or materials</li>
                    <li>Fraud, identity theft, or financial crimes</li>
                  </ul>
                </div>

                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">Harmful Content</h3>
                  <ul className="list-disc ml-6 text-orange-700 text-sm space-y-1">
                    <li>Malware, viruses, or malicious code distribution</li>
                    <li>Phishing, scamming, or deceptive practices</li>
                    <li>Harassment, threats, or abusive content</li>
                    <li>Adult content involving minors</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Network Abuse</h3>
                  <ul className="list-disc ml-6 text-yellow-700 text-sm space-y-1">
                    <li>Denial of Service (DoS) or Distributed Denial of Service (DDoS) attacks</li>
                    <li>Port scanning or network intrusion attempts</li>
                    <li>Spam email distribution or bulk unsolicited communications</li>
                    <li>Cryptocurrency mining without explicit permission</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Resource Usage Guidelines</h2>
              <p className="text-muted-foreground mb-3">
                Fair usage of server resources ensures optimal performance for all users:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                <li>CPU usage should not consistently exceed allocated limits</li>
                <li>Memory usage must stay within plan specifications</li>
                <li>Bandwidth usage should be reasonable for your service tier</li>
                <li>Storage should not exceed allocated disk space</li>
                <li>Database connections should be optimized and not excessive</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Content Guidelines</h2>
              <div className="space-y-3">
                <h3 className="font-semibold text-green-600">✓ Acceptable Content</h3>
                <ul className="list-disc ml-6 text-muted-foreground text-sm space-y-1">
                  <li>Business websites and applications</li>
                  <li>Personal blogs and portfolios</li>
                  <li>Educational and informational content</li>
                  <li>Gaming servers and communities</li>
                  <li>Open source projects and development</li>
                </ul>

                <h3 className="font-semibold text-red-600 mt-4">✗ Prohibited Content</h3>
                <ul className="list-disc ml-6 text-muted-foreground text-sm space-y-1">
                  <li>Copyrighted material without permission</li>
                  <li>Hate speech or discriminatory content</li>
                  <li>Illegal gambling or lottery operations</li>
                  <li>Pyramid schemes or multi-level marketing</li>
                  <li>Weapons, drugs, or illegal substance sales</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Security Requirements</h2>
              <p className="text-muted-foreground mb-3">
                You are responsible for maintaining the security of your services:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground space-y-1">
                <li>Keep all software and applications updated</li>
                <li>Use strong, unique passwords for all accounts</li>
                <li>Enable two-factor authentication where available</li>
                <li>Regularly backup your data</li>
                <li>Monitor your services for unauthorized access</li>
                <li>Report security incidents immediately</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Email and Communication</h2>
              <div className="space-y-3">
                <h3 className="font-semibold">Acceptable Email Practices</h3>
                <ul className="list-disc ml-6 text-muted-foreground text-sm space-y-1">
                  <li>Transactional emails (receipts, notifications)</li>
                  <li>Opt-in newsletters and marketing communications</li>
                  <li>Personal correspondence</li>
                  <li>Business communications with existing customers</li>
                </ul>

                <h3 className="font-semibold text-red-600">Prohibited Email Activities</h3>
                <ul className="list-disc ml-6 text-muted-foreground text-sm space-y-1">
                  <li>Sending unsolicited bulk email (spam)</li>
                  <li>Email harvesting or list purchasing</li>
                  <li>Forging email headers or sender information</li>
                  <li>Operating open mail relays</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Enforcement and Violations</h2>
              <div className="space-y-3">
                <h3 className="font-semibold">Violation Response</h3>
                <p className="text-muted-foreground text-sm">
                  When violations are detected, we may take the following actions:
                </p>
                <ul className="list-disc ml-6 text-muted-foreground text-sm space-y-1">
                  <li>Warning notification and request for compliance</li>
                  <li>Temporary suspension of services</li>
                  <li>Resource limitation or throttling</li>
                  <li>Account termination for severe violations</li>
                  <li>Legal action for criminal activities</li>
                </ul>

                <h3 className="font-semibold mt-4">Appeal Process</h3>
                <p className="text-muted-foreground text-sm">
                  If you believe your account was suspended in error, you may appeal by:
                </p>
                <ul className="list-disc ml-6 text-muted-foreground text-sm space-y-1">
                  <li>Contacting our support team with detailed explanation</li>
                  <li>Providing evidence of compliance</li>
                  <li>Agreeing to additional monitoring if required</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Reporting Violations</h2>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">How to Report</h3>
                <p className="text-blue-700 text-sm mb-2">
                  If you encounter content or activities that violate this policy:
                </p>
                <ul className="list-disc ml-6 text-blue-700 text-sm space-y-1">
                  <li>Email: abuse@stealordiecloud.com</li>
                  <li>Include detailed description and evidence</li>
                  <li>Provide URLs or server information if applicable</li>
                  <li>Reports are investigated within 24-48 hours</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Compliance Monitoring</h2>
              <p className="text-muted-foreground">
                We employ various methods to ensure compliance with this policy:
              </p>
              <ul className="list-disc ml-6 mt-2 text-muted-foreground">
                <li>Automated monitoring systems for resource usage</li>
                <li>Content scanning for prohibited materials</li>
                <li>Network traffic analysis for abuse detection</li>
                <li>Customer reports and community feedback</li>
                <li>Regular security audits and assessments</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Policy Updates</h2>
              <p className="text-muted-foreground">
                This Acceptable Use Policy may be updated periodically to address new threats, 
                technologies, or legal requirements. Continued use of our services constitutes 
                acceptance of any policy changes.
              </p>
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Questions?</strong> Contact our support team at crew@stealordiecloud.com 
                  for clarification on any aspect of this policy.
                </p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}