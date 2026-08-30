import {
  actualizarPedidoOrm,
  crearPedidoOrm,
  eliminarPedidoOrm,
  listarPedidosOrm,
  obtenerPedidoOrm
} from "../services/pedidos-orm.service.js";

export async function listarPedidos(
  req,
  res,
  next
) {
  try {
    res.status(
      200
    ).json({
      status:
        "ok",
      message:
        "Pedidos encontrados.",
      data:
        await listarPedidosOrm()
    });
  } catch (error) {
    next(error);
  }
}

export async function listarPedidosWeb(
  req,
  res,
  next
) {
  try {
    const pedidos = await listarPedidosOrm();

    res.status(200).render("pedidos", {
      titulo: "Gestión de pedidos",
      pedidos,
      hayPedidos: pedidos.length > 0,
      totalPedidos: pedidos.length
    });
  } catch (error) {
    next(error);
  }
}

export async function buscarPedido(
  req,
  res,
  next
) {
  try {
    const pedido =
      await obtenerPedidoOrm(
        req.params.id
      );

    if (!pedido) {
      return res.status(
        404
      ).json({
        status:
          "error",
        message:
          "Pedido no encontrado.",
        data:
          null
      });
    }

    return res.status(
      200
    ).json({
      status:
        "ok",
      message:
        "Pedido encontrado.",
      data:
        pedido
    });
  } catch (error) {
    next(error);
  }
}

export async function registrarPedido(
  req,
  res,
  next
) {
  try {
    const pedido =
      await crearPedidoOrm(
        req.body
      );

    res.status(
      201
    ).json({
      status:
        "ok",
      message:
        "Pedido creado.",
      data:
        pedido
    });
  } catch (error) {
    next(error);
  }
}

export async function modificarPedido(
  req,
  res,
  next
) {
  try {
    const pedido =
      await actualizarPedidoOrm(
        req.params.id,
        req.body
      );

    if (!pedido) {
      return res.status(
        404
      ).json({
        status:
          "error",
        message:
          "Pedido no encontrado.",
        data:
          null
      });
    }

    return res.status(
      200
    ).json({
      status:
        "ok",
      message:
        "Pedido actualizado.",
      data:
        pedido
    });
  } catch (error) {
    next(error);
  }
}

export async function crearPedidoWeb(
  req,
  res,
  next
) {
  try {
    await crearPedidoOrm({
      usuarioId: Number(req.body.usuarioId),
      total: Number(req.body.total),
      estado: req.body.estado || "pendiente"
    });

    return res.redirect("/pedidos");
  } catch (error) {
    if (error.statusCode === 400) {
      const usuarios = await import("../services/usuarios-orm.service.js")
        .then((m) => m.obtenerUsuariosOrm());

      return res.status(error.statusCode).render("pedidos/nuevo", {
        titulo: "Nuevo pedido",
        error: error.message,
        usuarios,
        valores: {
          usuarioId: req.body.usuarioId ?? "",
          total: req.body.total ?? "",
          estado: req.body.estado ?? ""
        }
      });
    }

    return next(error);
  }
}

export async function editarEstadoPedidoWeb(
  req,
  res,
  next
) {
  try {
    await actualizarPedidoOrm(
      req.params.id,
      { estado: req.body.estado }
    );

    return res.redirect("/pedidos");
  } catch (error) {
    return next(error);
  }
}

export async function eliminarPedidoWeb(
  req,
  res,
  next
) {
  try {
    const pedido = await eliminarPedidoOrm(
      req.params.id
    );

    if (!pedido) {
      return res.status(404).render("error", {
        titulo: "Pedido no encontrado",
        statusCode: 404,
        mensaje: "El pedido no existe."
      });
    }

    return res.redirect("/pedidos");
  } catch (error) {
    return next(error);
  }
}

export async function borrarPedido(
  req,
  res,
  next
) {
  try {
    const pedido =
      await eliminarPedidoOrm(
        req.params.id
      );

    if (!pedido) {
      return res.status(
        404
      ).json({
        status:
          "error",
        message:
          "Pedido no encontrado.",
        data:
          null
      });
    }

    return res.status(
      200
    ).json({
      status:
        "ok",
      message:
        "Pedido eliminado.",
      data:
        pedido
    });
  } catch (error) {
    next(error);
  }
}