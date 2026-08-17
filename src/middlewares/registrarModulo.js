export function registrarModulo(
  nombreModulo
) {
  return function (
    req,
    res,
    next
  ) {
    console.log(
      `[${nombreModulo}] ${req.method} ${req.originalUrl}`
    );

    next();
  };
}