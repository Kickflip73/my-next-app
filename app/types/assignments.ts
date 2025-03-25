// 作业相关类型定义

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName?: string;
  dueDate: Date;
  maxScore: number;
  status: 'pending' | 'submitted' | 'graded' | 'late';
  submissionDate?: Date;
  score?: number;
  feedback?: string;
  attachments?: AssignmentAttachment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AssignmentAttachment {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  url: string;
  uploadedAt: Date;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  userId: string;
  content: string;
  attachments: AssignmentAttachment[];
  submittedAt: Date;
  score?: number;
  feedback?: string;
  gradedAt?: Date;
  status: 'submitted' | 'graded';
}

export interface AssignmentCardProps {
  assignment: Assignment;
  className?: string;
  onClickCard?: (assignmentId: string) => void;
}

export interface AssignmentListProps {
  assignments: Assignment[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export interface AssignmentFormProps {
  assignment?: Assignment;
  onSubmit: (data: AssignmentSubmission) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export interface AssignmentFilters {
  status?: ('pending' | 'submitted' | 'graded' | 'late')[];
  courseId?: string;
  dueDate?: [Date, Date]; // [startDate, endDate]
} 