'use client';
import { PageWrapper } from '../../../../components/page-wrapper';
import { AddProjectForm } from './add-project-form';
import { useForm } from 'react-hook-form';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../../../../components/ui/breadcrumb';
import { zodResolver } from '@hookform/resolvers/zod';
import { addProjectAction } from '../../../../lib/actions';
import { toast } from 'sonner';
import Link from 'next/link';
import {
    AddProjectFormInput,
    AddProjectFormSchema,
} from '../../../../types/schema';
import { useTransition } from 'react';
import { Button } from '../../../../components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function AddProjectPage() {
    const [isPending, startTransition] = useTransition();
    const form = useForm<AddProjectFormInput>({
        resolver: zodResolver(AddProjectFormSchema),
        defaultValues: {
            name: '',
            description: '',
            isActive: true,
        },
    });
    const onSubmit = async (data: AddProjectFormInput) => {
        // console.log('on submit data: ', data);
        startTransition(async () => {
            const res = await addProjectAction(data);
            if (res.success) {
                toast.success('Project added successfully');
                form.reset();
            } else {
                toast.error(res.error || 'Failed to add project');
            }
        });
    };

    return (
        <PageWrapper
            breadcrumbs={
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="line-clamp-1">
                                <Link href="/projects">Projects</Link>
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="line-clamp-1">
                                Add New Project
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            }
        >
            {
                <div className="flex justify-end">
                    <Button variant="outline" asChild>
                        <Link href="/admin/projects">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            View all projects
                        </Link>
                    </Button>
                </div>
            }

            <div className=" mx-auto h-24 w-full max-w-3xl rounded-xl">
                <div className="flex flex-1 flex-col gap-4 px-4 py-10">
                    <AddProjectForm
                        form={form}
                        onSubmit={onSubmit}
                        isPending={isPending}
                    />
                </div>
            </div>
        </PageWrapper>
    );
}
