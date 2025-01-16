'use client';

export { default as FileUpload } from './fileUpload.component';
export type { FileUploadProps } from './fileUpload.component';
export { useFileUpload } from './useFileUpload.hook';
export type { UseFileUploadProps, UseFileUploadReturn } from './useFileUpload.hook';
export { FILE_TYPES } from './constants/file-type.constant';
export type { FileTypeKey } from './constants/file-type.constant';
export type { FileUploadTheme } from './types/theme.type';

// 필요한 타입들도 재export
export type { FileValidationResult, FileTypeConfig } from './types/file.type';