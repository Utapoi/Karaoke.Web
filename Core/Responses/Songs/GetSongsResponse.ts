import type { PaginatedResponse } from '../PaginatedResponse'
import type { SongInterface } from '~/Core/Models/Song'

export interface GetSongsResponse extends PaginatedResponse<SongInterface> {}
