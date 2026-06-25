Execute production deployment for $ARGUMENTS:

## Production Deployment Orchestration

### 1. Pre-Deployment Validation
- Verify all tests pass (unit, integration, e2e)
- Check security gate status
- Validate performance benchmarks
- Confirm code review approvals
- Verify documentation updates
- Check dependency vulnerabilities
- Validate database migrations
- Confirm rollback plan exists

### 2. Deployment Preparation
- Create deployment ticket
- Notify stakeholders
- Update status page
- Prepare rollback scripts
- Verify monitoring alerts
- Check resource capacity
- Validate feature flags
- Review deployment checklist

### 3. Blue-Green Deployment Setup
- Provision green environment
- Deploy to green environment
- Run smoke tests on green
- Verify health checks pass
- Validate configuration
- Check SSL certificates
- Test database connections
- Verify integrations

### 4. Canary Deployment Execution
- Route 5% traffic to new version
- Monitor error rates for 10 minutes
- If stable, increase to 25%
- Monitor for 20 minutes
- If stable, increase to 50%
- Monitor for 30 minutes
- If stable, increase to 100%
- Keep blue environment for rollback

### 5. Real-Time Monitoring
- Track error rate changes
- Monitor response times
- Check resource utilization
- Validate business metrics
- Monitor user complaints
- Track conversion rates
- Check third-party integrations
- Monitor database performance

### 6. Automated Rollback Triggers
- Error rate > 5% above baseline
- Response time > 50% increase
- Memory usage > 90%
- CPU usage sustained > 80%
- Failed health checks
- Database connection errors
- Critical business metric drop
- Security alert triggered

### 7. Post-Deployment Validation
- Run full e2e test suite
- Verify all features working
- Check monitoring dashboards
- Validate analytics events
- Review application logs
- Check security scanners
- Verify backup systems
- Test disaster recovery

### 8. Communication & Documentation
- Update deployment log
- Notify stakeholders of success
- Update release notes
- Document any issues
- Update runbooks
- Create post-mortem if needed
- Update architecture diagrams
- Schedule retrospective

### 9. Feature Flag Management
- Enable features gradually
- Monitor feature adoption
- A/B test configurations
- Track performance impact
- Manage user segments
- Document flag lifecycle
- Plan flag removal
- Update flag documentation

### 10. Cleanup & Optimization
- Remove old deployments
- Clean up unused resources
- Archive deployment artifacts
- Update capacity planning
- Review cost implications
- Optimize resource usage
- Update automation scripts
- Plan next improvements

## Deployment Modes
- **Standard**: Full blue-green with canary
- **Hotfix**: Expedited with reduced canary
- **Emergency**: Direct deployment with monitoring
- **Scheduled**: Maintenance window deployment
- **Feature**: Feature flag controlled
- **Regional**: Phased by geography
- **Percentage**: Gradual rollout by user percentage

## Safety Checks
- Automated rollback enabled
- Monitoring alerts configured
- On-call engineer available
- Rollback tested in staging
- Communication plan ready
- Backup systems verified
- SRE team notified

## Output Requirements
- Generate deployment_log.md
- Update deployment dashboard
- Send success notifications
- Create deployment metrics
- Archive deployment artifacts
- Update service catalog
- Generate compliance report
- Create deployment summary

## Success Criteria
- Zero downtime achieved
- SLOs maintained
- No customer complaints
- Successful health checks
- Performance maintained
- Security scans pass
- All features functional
- Rollback not needed

## Rollback Procedures
1. Identify rollback trigger
2. Notify stakeholders
3. Execute rollback script
4. Verify system stability
5. Document root cause
6. Plan remediation
7. Schedule retry
8. Update procedures

## Best Practices Applied
- Always deploy to staging first
- Use feature flags for risky changes
- Monitor business metrics
- Keep rollback window open
- Document everything
- Communicate proactively
- Learn from failures
- Automate repetitive tasks
