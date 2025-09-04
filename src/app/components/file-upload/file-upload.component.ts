import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { FileUploadService } from '../../services/file-upload/file-upload.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-file-upload',
  imports: [MatCardModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  private fileUploadService = inject(FileUploadService);

  @ViewChild('fileInput', { static: true }) fileInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('dropzone', { static: true }) dropzoneRef!: ElementRef<HTMLElement>;

  fileName = '';

  // Keep a counter for nested dragenter/dragleave events (more reliable UX)
  private dragCounter = 0;

  onDragEnter(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragCounter++;
    this.setDragging(true);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // indicate copy (helps UX)
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
    this.setDragging(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter <= 0) {
      this.dragCounter = 0;
      this.setDragging(false);
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragCounter = 0;
    this.setDragging(false);

    const dt = event.dataTransfer;
    this.handleFile(dt);
  }

  onChange($event: Event) {
    this.handleFile($event.target as HTMLInputElement | null);
  }

  private handleFile(fileInput: HTMLInputElement | DataTransfer | null) {
    if (fileInput?.files && fileInput.files.length > 0) {
      const selectedFiles = fileInput.files;
      console.log('Files selected:', selectedFiles);
      this.fileName = selectedFiles[0].name;

      try {
        this.fileUploadService.parseLogFile(selectedFiles[0]);
      } catch (err) {
        console.error('parseLogFile failed', err);
      }
    }
  }

  private setDragging(on: boolean) {
    const el = this.dropzoneRef?.nativeElement;
    if (!el) return;
    if (on) {
      el.classList.add('dragging');
    } else {
      el.classList.remove('dragging');
    }
  }

  // Prevent browser from opening files when dropped outside the dropzone
  @HostListener('window:dragover', ['$event'])
  @HostListener('window:drop', ['$event'])
  preventWindowDrop(event: DragEvent) {
    event.preventDefault();
  }
}
