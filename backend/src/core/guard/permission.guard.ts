/* import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { PermissionService } from "src/permission/permission.service"
import { Permissions } from "../decorator"
import Permission from "src/permission/enum/permission.enum"

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private reflector: Reflector, private readonly permissionService: PermissionService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const user = request.user

        // TODO: test this shit lmfao
        if (!user) return false

        const requiredPermissions = this.reflector.get<Permission[]>(Permissions, context.getHandler())

        if (!requiredPermissions) return true

        const permissions = await this.permissionService.getUserPermissions(user.id)

        return this.permissionService.hasPermissions(permissions, requiredPermissions)
    }
} */
