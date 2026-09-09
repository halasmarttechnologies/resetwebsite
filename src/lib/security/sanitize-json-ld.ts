/**
 * JSON-LD sanitiser for dangerouslySetInnerHTML injection.
 *
 * JSON-LD is injected inside a `<script type="application/ld+json">` tag.
 * If the serialised JSON contains a literal `</script>` or `<!--`, the
 * browser's HTML parser will close the script block early and interpret
 * the rest as raw HTML — a classic injection vector.
 *
 * Although our JSON-LD data is currently developer-controlled (not user
 * input), this guard future-proofs the codebase for when CMS content,
 * review text, or any other external data enters the schema.
 *
 * The function takes a JSON-serialisable value, stringifies it, and
 * replaces every dangerous sequence with a safe Unicode escape before
 * the result is set via dangerouslySetInnerHTML.
 */

/**
 * Produces a sanitised JSON string safe for injection inside a
 * `<script>` tag via `dangerouslySetInnerHTML`.
 *
 * Handles:
 *   • `</script>` → broken into `<\/script>` (JSON-valid escape)
 *   • `<!--`      → `<\\!--` to prevent HTML comment injection
 *   • `<![CDATA[` → escaped similarly
 *
 * @param data  Any JSON-serialisable value (object, array, string…)
 * @returns     A sanitised JSON string ready for `__html`.
 */
export function safeJsonLd(data: unknown): string {
  const raw = JSON.stringify(data);

  // Replace all variants of </script (case-insensitive) and HTML
  // comment openers that could break out of the <script> block.
  return raw
    .replace(/<\//g, "<\\/")         // </script → <\/script
    .replace(/<!--/g, "<\\!--")      // <!-- comment injection
    .replace(/<!\[CDATA\[/g, "<\\![CDATA["); // CDATA block injection
}
