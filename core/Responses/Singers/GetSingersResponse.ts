import type { SingerInterface } from '~/core/Models/Singer'
import type { PaginatedResponse } from '~/core/Responses/PaginatedResponse'

export interface GetSingersResponse extends PaginatedResponse<SingerInterface> {}
