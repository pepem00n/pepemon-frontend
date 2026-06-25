Establish performance baselines for $ARGUMENTS:

1. Measure current performance metrics
   - Page load time (FCP, LCP, TTI, CLS)
   - API response times (p50, p95, p99)
   - Database query performance
   - Memory usage patterns
   - CPU utilization trends
   - Network bandwidth usage
   - Concurrent user capacity
   - Error rates and types

2. Set up continuous performance monitoring
   - Real User Monitoring (RUM) setup
   - Synthetic monitoring configuration
   - APM (Application Performance Monitoring)
   - Database performance insights
   - Infrastructure monitoring
   - Log aggregation setup
   - Distributed tracing implementation
   - Custom metrics collection

3. Define performance budgets
   - Page weight: < 2MB (1MB gzipped)
   - Time to Interactive: < 3s
   - First Contentful Paint: < 1.5s
   - API response time: < 200ms (p95)
   - Database queries: < 100ms
   - Memory usage: < 512MB per instance
   - CPU usage: < 70% sustained
   - Error rate: < 0.1%

4. Create automated performance tests
   ```javascript
   // Lighthouse CI configuration
   {
     "ci": {
       "assert": {
         "preset": "lighthouse:recommended",
         "assertions": {
           "first-contentful-paint": ["error", {"maxNumericValue": 1500}],
           "interactive": ["error", {"maxNumericValue": 3000}],
           "speed-index": ["error", {"maxNumericValue": 3000}]
         }
       }
     }
   }
   ```
   - Load testing scenarios
   - Stress testing thresholds
   - Spike testing patterns
   - Soak testing duration

5. Identify performance bottlenecks
   - Frontend rendering issues
   - API endpoint slowdowns
   - Database query optimization needs
   - Network latency problems
   - Third-party service delays
   - Cache hit rate issues
   - Memory leaks detection
   - CPU-intensive operations

6. Set up alerting for degradation
   - Response time > baseline + 20%
   - Error rate > 1%
   - Memory usage > 80%
   - CPU usage > 85%
   - Database connections > 80%
   - Cache hit rate < 80%
   - Queue depth > 1000
   - Disk usage > 85%

7. Create performance dashboard
   ```yaml
   Dashboard Panels:
   - Real-time performance metrics
   - Historical trend analysis
   - User geography impact
   - Device type breakdown
   - API endpoint performance
   - Database query analysis
   - Cache effectiveness
   - Error distribution
   ```

8. Document optimization opportunities
   - Code splitting opportunities
   - Lazy loading candidates
   - Image optimization needs
   - API response optimization
   - Database index additions
   - Caching strategy improvements
   - CDN configuration tuning
   - Bundle size reduction

9. Plan progressive enhancement
   - Core functionality first
   - Enhanced features for capable devices
   - Offline-first strategies
   - Service worker implementation
   - Progressive image loading
   - Adaptive bitrate streaming
   - Connection-aware features
   - Device capability detection

10. Create performance SLAs
    - Availability: 99.9% (43.2 min/month)
    - Response time: 200ms (p95)
    - Error rate: < 0.1%
    - Throughput: 1000 req/sec
    - Concurrent users: 10,000
    - Data freshness: < 5 minutes
    - Recovery time: < 5 minutes
    - Degraded mode: < 1 hour/month

Performance Testing Matrix:
| Test Type | Frequency | Duration | Load | Success Criteria |
|-----------|-----------|----------|------|------------------|
| Baseline  | Daily     | 30 min   | 100% | Within budgets   |
| Load      | Weekly    | 2 hours  | 200% | <10% degradation |
| Stress    | Monthly   | 4 hours  | 400% | Graceful failure |
| Spike     | Monthly   | 1 hour   | 500% | Auto-scaling works|

Output Artifacts:
- performance_baseline.md with all metrics
- performance_budget.json for automation
- performance_dashboard.grafana
- optimization_roadmap.md with priorities
- performance_runbook.md for incidents
- sla_documentation.md for contracts

Automation Scripts:
- performance_test.js for automated testing
- alert_config.yaml for monitoring
- optimization_check.sh for CI/CD
- report_generator.py for stakeholders

Success Metrics:
- All pages meet performance budget
- Zero performance regressions
- 20% improvement in key metrics
- 99.9% SLA achievement
- User satisfaction increase
