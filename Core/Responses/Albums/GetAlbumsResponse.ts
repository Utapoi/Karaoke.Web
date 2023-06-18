import type { AlbumInterface } from '~/core/Models/Album'
import type { PaginatedResponse } from '~/core/Responses/PaginatedResponse'

export interface GetAlbumsResponse extends PaginatedResponse<AlbumInterface> {}
