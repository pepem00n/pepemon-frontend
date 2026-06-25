Validate observability implementation for $ARGUMENTS:

## Comprehensive Observability Validation

### 1. Distributed Tracing Coverage
- Verify OpenTelemetry SDK initialization
- Check trace context propagation across services
- Validate sampling configuration (adaptive/probabilistic)
- Ensure critical user paths have 100% tracing
- Verify baggage propagation for context
- Check span attributes for completeness
- Validate parent-child span relationships
- Test trace correlation across async operations

### 2. Metrics Implementation
- Verify all SLI metrics are instrumented
- Check custom business metrics implementation
- Validate metric naming conventions
- Ensure proper metric types (counter, gauge, histogram)
- Verify metric cardinality is within limits
- Check for missing error rate metrics
- Validate latency percentile calculations
- Ensure resource utilization metrics

### 3. Logging Standards
- Verify structured logging format (JSON)
- Check log correlation with traces (trace_id, span_id)
- Validate log levels appropriately used
- Ensure sensitive data is masked
- Check for missing error logs
- Verify contextual information in logs
- Validate log retention policies
- Check log volume and costs

### 4. Service Level Objectives (SLOs)
- Verify SLO definitions exist
- Check SLI measurement accuracy
- Validate error budget calculations
- Ensure alerting on SLO violations
- Review SLO dashboard visibility
- Check historical SLO performance
- Validate SLO review process
- Ensure stakeholder agreement on SLOs

### 5. Alerting Configuration
- Verify critical alerts are configured
- Check alert fatigue (too many alerts)
- Validate alert routing and escalation
- Ensure runbook links in alerts
- Check for missing alerting scenarios
- Validate alert suppression rules
- Test alert notification channels
- Review on-call rotation setup

### 6. Dashboard Creation
- Verify service overview dashboard exists
- Check technical metrics dashboards
- Validate business metrics visibility
- Ensure mobile-responsive dashboards
- Check for missing visualizations
- Validate dashboard load performance
- Ensure proper access controls
- Review dashboard documentation

### 7. Error Tracking
- Verify error aggregation setup
- Check error deduplication logic
- Validate error context capture
- Ensure source map uploads (frontend)
- Check error trend analysis
- Validate error assignment workflow
- Review error resolution tracking
- Check integration with ticketing

### 8. Performance Monitoring
- Verify APM agent installation
- Check transaction tracing setup
- Validate database query monitoring
- Ensure external service monitoring
- Check cache performance metrics
- Validate CDN performance tracking
- Review frontend performance (Core Web Vitals)
- Check resource utilization trends

### 9. Synthetic Monitoring
- Verify critical user journey monitors
- Check monitor frequency and locations
- Validate alert thresholds
- Ensure API endpoint monitoring
- Check for missing test scenarios
- Validate test data management
- Review monitor maintenance process
- Check false positive rate

### 10. Cost Optimization
- Review telemetry data volume
- Check sampling strategies
- Validate data retention policies
- Ensure efficient queries
- Review cardinality explosion risks
- Check for redundant metrics
- Validate compression settings
- Monitor observability spend

## Validation Checklist
- [ ] All services have tracing enabled
- [ ] Business KPIs are tracked
- [ ] Error budgets are defined
- [ ] Alerts have runbooks
- [ ] Dashboards load < 5 seconds
- [ ] Logs are correlated with traces
- [ ] SLOs are publicly visible
- [ ] On-call rotation is defined
- [ ] Synthetic tests cover critical paths
- [ ] Observability costs are tracked

## Output Requirements
- Generate observability_report.md
- Include coverage percentages
- List missing instrumentation
- Provide implementation examples
- Create priority remediation list
- Include cost impact analysis
- Generate team training needs

## Quality Gates
- Minimum 95% trace coverage for critical paths
- All errors must be tracked
- SLOs defined for user-facing services
- Alerts must have runbooks
- Dashboard load time < 5 seconds
- Log correlation > 90%

## Best Practices Applied
- Use OpenTelemetry for vendor neutrality
- Implement adaptive sampling
- Use structured logging
- Define SLOs from user perspective
- Keep cardinality under control
- Automate dashboard creation
- Version control all configurations
