export interface ImageLinks {
    smallThumbnail: string
    thumbnail: string
  }

export interface VolumeInfo {
    title: string
    authors: string[]
    publisher?: string
    publishedDate: string
    description?: string
    pageCount: number
    printType: string
    categories?: string[]
    maturityRating: string
    imageLinks: ImageLinks
    allowAnonLogging: boolean
    contentVersion: string
    language: string
    previewLink: string
    infoLink: string
    canonicalVolumeLink: string
    subtitle?: string
    averageRating?: number
    ratingsCount?: number
  }

export interface IItem {
    kind: string
    id: string
    etag: string
    selfLink: string
    volumeInfo: VolumeInfo
}

export interface ServerResponse<T> {
    kind: string
    totalItems: number
    items: T[]
}

