Execute comprehensive security gate for $ARGUMENTS:

## Pre-Deployment Security Validation

### 1. Static Application Security Testing (SAST)
- Run language-specific security analyzers (Semgrep, SonarQube, CodeQL)
- Check for OWASP Top 10 vulnerabilities
- Identify insecure coding patterns
- Validate input sanitization practices
- Check for hardcoded credentials using trufflehog/gitleaks
- Analyze code complexity for security implications

### 2. Dependency Security Scanning
- Run npm audit, pip-audit, or language-specific tools
- Check for known CVEs in dependencies using Trivy/Snyk
- Validate dependency licenses for compliance
- Check for typosquatting in package names
- Review dependency update policies
- Analyze transitive dependencies

### 3. Infrastructure Security Validation
- Scan IaC templates for misconfigurations (Checkov, Terrascan)
- Validate least-privilege IAM policies
- Check for exposed secrets in environment variables
- Verify encryption at rest and in transit
- Validate network security groups and firewall rules
- Check for public exposure of sensitive resources

### 4. Container Security (if applicable)
- Scan container images for vulnerabilities
- Check for running as root
- Validate minimal base images
- Review Dockerfile best practices
- Check for exposed ports and services
- Verify image signing and attestation

### 5. API Security Assessment
- Validate authentication mechanisms
- Check authorization at all endpoints
- Verify rate limiting implementation
- Test for injection vulnerabilities
- Validate CORS configuration
- Check for sensitive data in URLs/logs

### 6. Data Security Validation
- Verify PII handling and encryption
- Check data retention policies
- Validate backup security
- Review data access patterns
- Check for SQL injection vulnerabilities
- Validate parameterized queries

### 7. Authentication & Authorization
- Review JWT implementation if used
- Check session management
- Validate password policies
- Review MFA implementation
- Check for privilege escalation paths
- Validate OAuth/SAML configurations

### 8. Security Headers & Configuration
- Validate Content-Security-Policy
- Check X-Frame-Options
- Verify HSTS implementation
- Review cookie security flags
- Check for security.txt file
- Validate TLS configuration

### 9. Compliance Checks
- GDPR compliance for EU users
- CCPA compliance for California users
- SOC2 control validation
- HIPAA compliance if healthcare data
- PCI DSS if payment processing
- Industry-specific regulations

### 10. Security Monitoring Setup
- Verify security event logging
- Check intrusion detection setup
- Validate alerting mechanisms
- Review incident response procedures
- Check security metrics collection
- Validate audit trail completeness

## Output Requirements
- Generate security_report.md with findings
- Categorize issues: CRITICAL, HIGH, MEDIUM, LOW
- Provide remediation steps for each finding
- Include CVSS scores where applicable
- Generate executive summary
- Create developer-friendly fix instructions

## Blocking Criteria
- ANY critical vulnerability blocks deployment
- More than 3 high vulnerabilities blocks deployment
- Exposed secrets or credentials blocks deployment
- Failed authentication/authorization checks blocks deployment
- Non-compliant with regulatory requirements blocks deployment

## Integration Points
- Link to CI/CD pipeline
- Update security dashboard
- Notify security team of findings
- Create tickets for remediation
- Update risk register

Remember: Security is not a one-time check but a continuous process. This gate ensures minimum security standards are met before each deployment.
