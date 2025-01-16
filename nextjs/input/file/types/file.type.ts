// 기본 타입 정의
export type MimeType = string;
export type Extension = string;

// 파일 검증 결과 인터페이스
export interface FileValidationResult {
    isValid: boolean;
    error?: string;
}

// 파일 타입 설정 인터페이스
export interface FileTypeConfig {
    type: string;
    mimeTypes: readonly MimeType[];
    extensions: readonly Extension[];
    maxSize: number;
    description: string;
}