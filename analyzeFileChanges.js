import { execSync } from "child_process";
import path from "path";

async function analyzeFileChanges(file) {
  const ext = path.extname(file);
  const diff = execSync(`git diff --cached "${path.resolve(file)}"`).toString();
  if (!diff) return null;

  if (file.includes("test")) return "test: updated test cases";
  if (ext === ".md") return "docs: updated documentation";

  if (ext.match(/\.(css|scss|less)$/) || file.includes("styles")) {
    if (diff.includes("@media")) return "fix(ui): improved responsiveness";
    if (diff.match(/color|margin|padding|font-size/))
      return "style(ui): updated styling properties";
    return "style: updated styles";
  }

  if (diff.match(/useState|useReducer|setState/)) {
    const matches = diff.match(
      /(const|let|var)\s+(\w+)\s*=\s*use(State|Reducer)/
    );
    return matches
      ? `fix(ui): updated state logic in ${matches[2]}`
      : "fix(ui): updated state management";
  }

  if (diff.match(/framer-motion|gsap/)) return "feat(ui): improved animations";

  if (
    file.includes("routes/") ||
    file.includes("controllers/") ||
    file.includes("services/")
  )
    return "feat(api): updated API endpoints";
  if (diff.match(/res\.status|res\.send/))
    return "fix(api): fixed response handling";
  if (diff.match(/app\.use\(|req, res, next/))
    return "feat(middleware): added new middleware";
  if (diff.match(/JWT|bcrypt|auth|passport/))
    return "feat(auth): updated authentication logic";

  if (diff.match(/onClick|onChange|onSubmit/)) {
    const eventMatch = diff.match(/on(Click|Change|Submit)/);
    return eventMatch
      ? `fix(ui): modified event handler for ${eventMatch[0]}`
      : "fix(ui): updated event handling";
  }

  if (ext.match(/\.(sql|json|yaml)$/))
    return "chore(db): updated database schema/config";
  if (diff.match(/db\.query|mongoose|sequelize/))
    return "chore(db): modified database queries";
  if (diff.match(/LIMIT|INDEX|EXPLAIN/))
    return "perf(db): optimized database query";

  if (diff.match(/useMemo|useCallback|lazy\(/))
    return "perf(ui): optimized component rendering";
  if (diff.match(/forEach|map|reduce/) && diff.includes("optimized"))
    return "perf: improved performance";

  if (diff.match(/helmet|cors|sanitize|escape|xss/))
    return "fix(security): enhanced security measures";
  if (diff.match(/password|API_KEY/) && diff.includes("removed"))
    return "fix(security): removed sensitive data";

  if (file.includes(".env") || file.includes("config"))
    return "chore(config): updated configuration settings";
  if (file.includes("package.json")) return "chore(deps): updated dependencies";
  if (file.includes("eslint") || file.includes(".gitignore"))
    return "chore(lint): updated linting rules";

  if (
    file.includes(".github/") ||
    file.includes(".gitlab-ci.yml") ||
    file.includes("Jenkinsfile")
  )
    return "fix(ci): fixed CI/CD pipeline issues";
  if (
    file.includes("Dockerfile") ||
    file.includes("kubernetes/") ||
    file.includes("serverless.yml")
  )
    return "feat(deployment): updated deployment configurations";
  if (file.includes("locales/") || diff.match(/t\(['"`]/))
    return "fix(i18n): updated translations";
  if (diff.match(/tooltip|aria-|focus|tabindex/))
    return "feat(ux): improved accessibility and UI behavior";
  if (diff.match(/console\.log|logger\.warn|logger\.error/))
    return "fix(logs): improved logging and debugging";
  if (file.includes("bin/") || file.includes("scripts/"))
    return "feat(cli): improved CLI utilities";
  if (
    file.includes("robots.txt") ||
    file.includes("sitemap.xml") ||
    diff.match(/meta name="description"/)
  )
    return "fix(seo): updated SEO metadata";
  if (
    diff.match(/ga\(/) ||
    diff.match(/mixpanel\.track/) ||
    diff.match(/analytics\.logEvent/)
  )
    return "chore(analytics): updated tracking configuration";
  if (diff.match(/toast|pushNotification|showMessage/))
    return "feat(notification): improved notification system";

  return "chore: minor updates";
}

export default analyzeFileChanges;
