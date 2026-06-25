Run chaos engineering tests for $ARGUMENTS:

## Chaos Engineering Test Suite

### 1. Service Failure Simulation
- Kill random service instances (pod deletion)
- Simulate service degradation (CPU/memory stress)
- Inject artificial latency (network delays)
- Force service restarts during peak load
- Simulate dependency failures
- Test circuit breaker activation
- Validate graceful degradation
- Check failover mechanisms

### 2. Network Chaos Testing
- Simulate network partitions between services
- Inject packet loss (1%, 5%, 10%)
- Add variable latency (50ms-500ms)
- Simulate bandwidth restrictions
- Test DNS failures
- Validate timeout configurations
- Check retry mechanisms
- Test connection pool exhaustion

### 3. Database Chaos
- Simulate primary database failure
- Test read replica failover
- Inject query latency
- Simulate connection pool exhaustion
- Test transaction deadlocks
- Validate backup restoration
- Check data consistency during failures
- Test split-brain scenarios

### 4. Infrastructure Failures
- Simulate AZ/region failures
- Test autoscaling under stress
- Simulate disk space exhaustion
- Inject CPU/memory pressure
- Test container orchestration failures
- Validate infrastructure as code recovery
- Check resource limit handling
- Test spot instance interruptions

### 5. Dependency Failures
- Simulate third-party API outages
- Test payment gateway failures
- Inject CDN failures
- Simulate messaging queue outages
- Test cache layer failures
- Validate email service outages
- Check external auth provider failures
- Test webhook delivery failures

### 6. Data Corruption Scenarios
- Inject malformed data
- Test schema migration failures
- Simulate partial write failures
- Check data validation boundaries
- Test backup corruption scenarios
- Validate data recovery procedures
- Check referential integrity
- Test event sourcing recovery

### 7. Security Chaos
- Simulate DDoS attacks
- Test rate limiting effectiveness
- Inject authentication failures
- Simulate certificate expiration
- Test key rotation during load
- Validate security group changes
- Check WAF rule effectiveness
- Test intrusion detection

### 8. User Experience Chaos
- Simulate slow page loads
- Test partial content delivery
- Inject JavaScript errors
- Simulate mobile network conditions
- Test offline functionality
- Validate progressive enhancement
- Check accessibility under stress
- Test i18n/l10n failures

### 9. Operational Chaos
- Simulate monitoring failures
- Test log aggregation outages
- Inject metrics collection failures
- Simulate alerting channel failures
- Test runbook effectiveness
- Validate on-call procedures
- Check backup system failures
- Test deployment rollback

### 10. Compliance & Business Continuity
- Test disaster recovery procedures
- Validate RTO/RPO achievements
- Check audit trail completeness
- Test data residency compliance
- Validate regulatory reporting
- Check business continuity plans
- Test communication procedures
- Validate insurance claim data

## Test Execution Framework
1. Define steady state metrics
2. Hypothesize about behavior
3. Introduce chaos variables
4. Observe and measure impact
5. Document findings
6. Implement improvements
7. Re-test to validate fixes

## Safety Mechanisms
- Automatic rollback triggers
- Blast radius limitation
- Real-time monitoring
- Kill switch implementation
- Stakeholder notifications
- Exclude critical times
- Start with non-production

## Output Requirements
- Generate chaos_test_report.md
- Document all failures found
- Include recovery times
- Provide improvement recommendations
- Create runbook updates
- Generate training materials
- Update architecture diagrams
- Create executive summary

## Success Criteria
- System recovers within SLO
- No data loss occurs
- Users experience graceful degradation
- Alerts fire appropriately
- Team responds effectively
- Rollback works as expected
- Post-mortem process functions

## Game Day Planning
- Schedule regular chaos days
- Involve all team members
- Create realistic scenarios
- Document lessons learned
- Update procedures based on findings
- Celebrate successful recoveries
- Share findings across organization

Remember: The goal is not to break things, but to learn how systems fail and improve resilience.
