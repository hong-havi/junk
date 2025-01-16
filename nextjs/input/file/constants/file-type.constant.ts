// src/constants/fileTypes.ts
import { MimeType, Extension } from '../types/file.type';

export const FILE_TYPES = {
    DOCUMENT: {
        type: 'document' as const,
        mimeTypes: [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'text/plain',
            'application/rtf',
        ] as readonly MimeType[],
        extensions: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf'] as readonly Extension[],
        maxSize: 10 * 1024 * 1024, // 10MB
        description: '문서 파일'
    },
    IMAGE: {
        type: 'image' as const,
        mimeTypes: [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/svg+xml',
            'image/bmp',
        ] as readonly MimeType[],
        extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'] as readonly Extension[],
        maxSize: 5 * 1024 * 1024, // 5MB
        description: '이미지 파일'
    },
    VIDEO: {
        type: 'video' as const,
        mimeTypes: [
            'video/mp4',
            'video/mpeg',
            'video/webm',
            'video/quicktime',
            'video/x-msvideo',
        ] as readonly MimeType[],
        extensions: ['mp4', 'mpeg', 'webm', 'mov', 'avi'] as readonly Extension[],
        maxSize: 100 * 1024 * 1024, // 100MB
        description: '비디오 파일'
    },
    AUDIO: {
        type: 'audio' as const,
        mimeTypes: [
            'audio/mpeg',
            'audio/wav',
            'audio/ogg',
            'audio/midi',
            'audio/x-midi',
            'audio/aac',
        ] as readonly MimeType[],
        extensions: ['mp3', 'wav', 'ogg', 'midi', 'aac'] as readonly Extension[],
        maxSize: 50 * 1024 * 1024, // 50MB
        description: '오디오 파일'
    },
    ARCHIVE: {
        type: 'archive' as const,
        mimeTypes: [
            'application/zip',
            'application/x-rar-compressed',
            'application/x-7z-compressed',
            'application/x-tar',
            'application/gzip',
        ] as readonly MimeType[],
        extensions: ['zip', 'rar', '7z', 'tar', 'gz'] as readonly Extension[],
        maxSize: 50 * 1024 * 1024, // 50MB
        description: '압축 파일'
    },
} as const;

// 파일 타입 키 타입 추출
export type FileTypeKey = keyof typeof FILE_TYPES;