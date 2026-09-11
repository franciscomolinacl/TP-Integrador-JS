export function manejarErrores(
  error,
  req,
  res,
  next
) {
  if (
    error.name ===
    "UnauthorizedError"
  ) {
    let message =
      "Token inválido o ausente.";

    if (
      error.code ===
      "credentials_required"
    ) {
      message =
        "Token de autenticación requerido.";
    }

    if (
      error.code ===
      "invalid_token"
    ) {
      message =
        "Token inválido o expirado.";
    }

    return res
      .status(401)
      .json({
        status:
          "error",
        message,
        data:
          null
      });
  }

  const statusCode =
    error.statusCode ??
    500;

  const message =
    statusCode >= 500
      ? "Error interno del servidor."
      : error.message;

  console.error(
    error
  );

  return res
    .status(statusCode)
    .json({
      status:
        "error",
      message,
      data:
        null
    });
}