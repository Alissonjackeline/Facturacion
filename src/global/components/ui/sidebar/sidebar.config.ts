import { Building2, BookUser, Package, Settings, CreditCard, type LucideIcon } from "lucide-react";

export type NavItem = {
    id: string;
    label: string;
    icon?: LucideIcon;
    to?: string;
    children?: NavItem[];
};

export const NAV_ITEMS: NavItem[] = [
    {
        id: "contactos",
        label: "Contactos",
        icon: BookUser,
        children: [
            { id: "usuarios", label: "Usuarios", to: "/contactos/usuarios" },
            { id: "rolespermisos", label: "Roles y permisos", to: "/contactos/" },
            { id: "clientes", label: "Clientes", to: "/contactos/" },
            { id: "proveedor", label: "Proveedores", to: "/contactos/" },
        ],
    },
    {
        id: "organizacion",
        label: "Organizacion",
        icon: Building2,
        children: [
            { id: "empresa", label: "Empresa", to: "/organizacion" },
            { id: "sucursales", label: "Sucursales", to: "/organizacion" },
            { id: "almacenes", label: "Almacenes", to: "/organizacion" },
        ],
    },
    {
        id: "productos",
        label: "Productos",
        icon: Package,
        children: [
            { id: "productos", label: "Productos", to: "/productos" },
            { id: "grupo", label: "Grupos", to: "/productos" },
            { id: "familias", label: "Familias", to: "/productos" },
            { id: "lineas", label: "Lineas", to: "/productos" },
            { id: "marcas", label: "Marcas", to: "/productos" },
            { id: "modelos", label: "Modelos", to: "/productos" },
            { id: "catprecios", label: "Categoria Precios", to: "/productos" },
            { id: "productcanje", label: "Productos Canje", to: "/productos" },
            { id: "canjes", label: "Canjes", to: "/productos" },
            { id: "ofertas", label: "Ofertas", to: "/productos" },
            { id: "presentaciones", label: "Presentaciones", to: "/productos" },
        ],
    },
    {
        id: "configuracion",
        label: "Configuracion",
        icon: Settings,
        children: [
            { id: "entidades", label: "Entidades", to: "/config" },
            { id: "tpservicio", label: "Tipo de Servicio", to: "/config" },
            { id: "tpcambio", label: "Tipo de Cambio", to: "/config" },
            { id: "estados", label: "Estados", to: "/config" },
            { id: "ecomconf", label: "Ecommerce Configuracion", to: "/config" },
            { id: "notificaciones", label: "Notificaciones", to: "/config" },
            { id: "plantillas", label: "Plantillas de Impresión", to: "/config" },
            { id: "personalizacion", label: "Personalización de Formatos", to: "/config" },
        ],
    },
    {
        id: "cajabancos",
        label: "Caja y Bancos",
        icon: CreditCard,
        children: [
            { id: "ingresos", label: "Ingresos", to: "/caja" },
            { id: "egresos", label: "Egresos", to: "/caja" },
            {
                id: "categoria", label: "Categoria",
                children: [
                    { id: "ingrcaja", label: "Ingresos", to: "/categoria" },
                    { id: "egrcaja", label: "Egresos", to: "/categoria" }
                ],
            },
            { id: "cajas", label: "Cajas", to: "/cajas" },
            { id: "cuentasemp", label: "Cuentas empresa", to: "/cajas" },
            { id: "cobrosr", label: "Cobros realizados", to: "/cajas" },
        ],
    },


    // {
    //     id: "ventas",
    //     label: "Ventas",
    //     icon: FileText,
    //     children: [
    //         {
    //             id: "comprobantes",
    //             label: "Comprobantes",
    //             children: [
    //                 { id: "facturas", label: "Facturas", to: "/ventas/facturas" },
    //                 { id: "boletas", label: "Boletas", to: "/ventas/boletas" },
    //                 { id: "notas-credito", label: "Notas de crédito", to: "/ventas/notas-credito" },
    //                 { id: "notas-debito", label: "Notas de débito", to: "/ventas/notas-debito" },
    //             ],
    //         },
    //     ],
    // },
];

export const isItemActive = (item: NavItem, pathname: string): boolean =>
    item.to
        ? pathname === item.to || pathname.startsWith(item.to + "/")
        : !!item.children?.some((c) => isItemActive(c, pathname));

export const countLeaves = (item: NavItem): number =>
    item.children
        ? item.children.reduce((acc, c) => acc + countLeaves(c), 0)
        : 1;