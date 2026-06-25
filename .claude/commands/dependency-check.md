Analyze and validate all dependencies for $ARGUMENTS:

1. Check third-party service dependencies
   - API service availability and health
   - Rate limit current usage vs. limits
   - SLA compliance verification
   - Planned maintenance windows
   - API version compatibility
   - Authentication token validity
   - Backup service availability
   - Geographic availability zones

2. Validate API version compatibility
   - Current version vs. required version
   - Deprecation warnings and timelines
   - Breaking changes identification
   - Migration path documentation
   - Backward compatibility check
   - Feature availability matrix
   - Performance differences
   - Security patches required

3. Review library/package dependencies
   - Direct dependency audit
   - Transitive dependency scan
   - Version conflict resolution
   - Security vulnerability check (CVE database)
   - License compatibility review
   - Size/performance impact
   - Maintenance status (abandoned?)
   - Alternative package options

4. Check infrastructure requirements
   - CPU/Memory requirements
   - Storage capacity needs
   - Network bandwidth usage
   - Database connection pools
   - Cache memory allocation
   - Load balancer configuration
   - SSL certificate validity
   - DNS propagation status

5. Validate data schema compatibility
   - Database migration compatibility
   - API contract changes
   - Data type modifications
   - Required vs. optional fields
   - Validation rule changes
   - Index requirements
   - Foreign key constraints
   - Backward data compatibility

6. Review team dependencies and handoffs
   - Frontend ← → Backend coordination
   - Design asset delivery status
   - QA environment readiness
   - DevOps deployment scripts
   - Documentation completion
   - Training material preparation
   - Support team readiness
   - Marketing launch alignment

7. Check regulatory/compliance dependencies
   - GDPR compliance checklist
   - CCPA requirements met
   - SOC2 audit requirements
   - HIPAA compliance (if applicable)
   - PCI DSS standards
   - Accessibility compliance (WCAG)
   - Industry-specific regulations
   - Data residency requirements

8. Validate performance dependencies
   - Baseline performance metrics
   - Load testing completion
   - CDN configuration ready
   - Caching strategy implemented
   - Database indexing complete
   - Query optimization done
   - Resource scaling plans
   - Performance monitoring setup

9. Review security dependencies
   - Security scan completion
   - Penetration testing done
   - SSL/TLS configuration
   - API key rotation ready
   - WAF rules configured
   - DDoS protection enabled
   - Secrets management setup
   - Access control verification

10. Check feature flag dependencies
    - Parent flag dependencies
    - Mutual exclusion rules
    - User segment definitions
    - Rollout percentage configs
    - Override mechanisms ready
    - Monitoring integration
    - A/B test configuration
    - Emergency kill switches

Critical Path Analysis:
- Identify blocking dependencies
- Calculate dependency chains
- Estimate resolution timelines
- Assign dependency owners
- Create dependency graph
- Monitor resolution progress
- Escalation procedures
- Risk mitigation plans

Output Format:
- dependency_matrix.md with status indicators
  ✅ Ready
  ⚠️ At Risk  
  ❌ Blocked
  🔄 In Progress
- dependency_graph.mermaid for visualization
- critical_path.md with timeline
- dependency_owners.md with contacts
- resolution_tracker.md for progress

Automation Integration:
- Create dependency check CI/CD job
- Implement automated alerts
- Schedule regular dependency audits
- Integrate with project management
- Update dependency dashboard

Success Criteria:
- All critical dependencies ✅
- No blocking dependencies ❌
- Risk dependencies < 10% ⚠️
- Clear ownership assigned
- Resolution timeline defined
