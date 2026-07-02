export function GET() {
  return new Response(
    `<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <body>Verification: e534c429edceb92a</body>
</html>`,
    {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    }
  );
}
