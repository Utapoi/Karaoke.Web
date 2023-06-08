import type { Singer } from '~/core/models/Singer'
import type { PaginatedResponse } from '~/core/responses/PaginatedResponse'

export interface GetSingersResponse extends PaginatedResponse<Singer> {

}
