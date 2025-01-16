import { SystemStyleObject } from '@mui/system';
import { Theme } from '@mui/material/styles';

export interface FileUploadStyles {
    container: SystemStyleObject<Theme>;
    dropzone: {
        base: SystemStyleObject<Theme>;
        dragging: SystemStyleObject<Theme>;
        uploading: SystemStyleObject<Theme>;
    };
    content: SystemStyleObject<Theme>;
    input: SystemStyleObject<Theme>;
    button: SystemStyleObject<Theme>;
    icon: {
        container: SystemStyleObject<Theme>;
        color: SystemStyleObject<Theme>;
    };
    text: {
        primary: SystemStyleObject<Theme>;
        description: SystemStyleObject<Theme>;
    };
    error: {
        container: SystemStyleObject<Theme>;
        icon: SystemStyleObject<Theme>;
        text: SystemStyleObject<Theme>;
    };
}

export const defaultStyles: FileUploadStyles = {
    container: {
        width: '100%'
    },
    dropzone: {
        base: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            p: 2,
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 1,
            bgcolor: 'background.paper',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
                borderColor: 'primary.main'
            }
        },
        dragging: {
            borderColor: 'primary.main',
            bgcolor: 'primary.50'
        },
        uploading: {
            opacity: 0.7,
            pointerEvents: 'none' as const
        }
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        width: '100%'
    },
    input: {
        display: 'none'
    },
    button: {
        minWidth: 120,
        whiteSpace: 'nowrap'
    },
    icon: {
        container: {
            flexShrink: 0
        },
        color: {
            color: 'primary.main'
        }
    },
    text: {
        primary: {
            color: 'text.primary'
        },
        description: {
            fontSize: 'body2.fontSize',
            color: 'text.secondary',
            flexGrow: 1
        }
    },
    error: {
        container: {
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            ml: 2
        },
        icon: {
            color: 'error.main',
            flexShrink: 0
        },
        text: {
            fontSize: 'body2.fontSize',
            color: 'error.main'
        }
    }
};

export const darkStyles: FileUploadStyles = {
    container: {
        width: '100%'
    },
    dropzone: {
        base: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            p: 2,
            border: '1px solid',
            borderColor: 'grey.700',
            borderRadius: 1,
            bgcolor: 'grey.900',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
                borderColor: 'primary.main'
            }
        },
        dragging: {
            borderColor: 'primary.light',
            bgcolor: 'grey.800'
        },
        uploading: {
            opacity: 0.7,
            pointerEvents: 'none' as const
        }
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        width: '100%'
    },
    input: {
        display: 'none'
    },
    button: {
        minWidth: 120,
        whiteSpace: 'nowrap'
    },
    icon: {
        container: {
            flexShrink: 0
        },
        color: {
            color: 'primary.light'
        }
    },
    text: {
        primary: {
            color: 'text.primary'
        },
        description: {
            fontSize: 'body2.fontSize',
            color: 'text.secondary',
            flexGrow: 1
        }
    },
    error: {
        container: {
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            ml: 2
        },
        icon: {
            color: 'error.light',
            flexShrink: 0
        },
        text: {
            fontSize: 'body2.fontSize',
            color: 'error.light'
        }
    }
};