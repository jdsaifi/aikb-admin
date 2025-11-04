'use client';

import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './ui/table';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ICall } from '../types';
import {
    removeCallFromProject,
    addCallsToProject,
} from '../lib/services/projectService';
import { toast } from 'sonner';
import {
    Users,
    PhoneMissed,
    PhoneIncoming,
    PhoneCall,
    Folder,
} from 'lucide-react';
import Link from 'next/link';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';

import { DisplayDate } from './display-date';

interface ProjectCallsTableProps {
    projectCalls: ICall[];
    allCalls: ICall[];
    projectId: string;
}

export function ProjectCallsTable({
    projectCalls,
    allCalls,
    projectId,
}: ProjectCallsTableProps) {
    const [isAddingCall, setIsAddingCall] = useState(false);
    const [selectedCallIds, setSelectedCallIds] = useState<string[]>([]);
    const [isRemovingCall, setIsRemovingCall] = useState<string | null>(null);

    // Filter out users that are already assigned to the project
    const availableCalls = allCalls.filter(
        (call) =>
            !projectCalls.some((projectCall) => projectCall._id === call._id)
    );

    const handleAddCalls = async () => {
        if (selectedCallIds.length === 0) {
            toast.error('Please select at least one call');
            return;
        }
        setIsAddingCall(true);
        try {
            await addCallsToProject(projectId, selectedCallIds);
            toast.success('Calls added to project successfully');
            setSelectedCallIds([]);
            window.location.reload();
        } catch (error: any) {
            toast.error(
                error?.message ||
                    'An error occurred while adding calls to project'
            );
        } finally {
            setIsAddingCall(false);
        }
    };

    const handleRemoveCall = async (callId: string) => {
        setIsRemovingCall(callId);
        try {
            await removeCallFromProject(projectId, callId);
            toast.success('Call removed from project successfully');
            // Refresh the page to show updated data
            window.location.reload();
        } catch (error) {
            toast.error('An error occurred while removing call from project');
        } finally {
            setIsRemovingCall(null);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <PhoneCall className="h-5 w-5" />
                    <h3 className="text-lg font-medium">Project Calls</h3>
                    <Badge variant="secondary">
                        {projectCalls.length} calls
                    </Badge>
                </div>

                <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" asChild>
                        <Link href="/admin/projects">
                            <Folder className="mr-2 h-4 w-4" />
                            All Projects
                        </Link>
                    </Button>
                    {availableCalls.length > 0 && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="sm">
                                    <PhoneIncoming className="mr-2 h-4 w-4" />
                                    Add Call
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="min-w-3xl">
                                <DialogHeader>
                                    <DialogTitle>
                                        Add Calls to Project
                                    </DialogTitle>
                                    <DialogDescription>
                                        Select one or more calls to add to this
                                        project. They will be able to access all
                                        project features.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="max-h-64 overflow-y-auto border rounded w-full">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead></TableHead>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>
                                                        Created At
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {availableCalls.map((call) => (
                                                    <TableRow key={call._id}>
                                                        <TableCell>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedCallIds.includes(
                                                                    call._id
                                                                )}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    if (
                                                                        e.target
                                                                            .checked
                                                                    ) {
                                                                        setSelectedCallIds(
                                                                            (
                                                                                prev
                                                                            ) => [
                                                                                ...prev,
                                                                                call._id,
                                                                            ]
                                                                        );
                                                                    } else {
                                                                        setSelectedCallIds(
                                                                            (
                                                                                prev
                                                                            ) =>
                                                                                prev.filter(
                                                                                    (
                                                                                        id
                                                                                    ) =>
                                                                                        id !==
                                                                                        call._id
                                                                                )
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            {call.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            <DisplayDate
                                                                date={
                                                                    call.createdAt
                                                                }
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <Button
                                            onClick={handleAddCalls}
                                            disabled={
                                                selectedCallIds.length === 0 ||
                                                isAddingCall
                                            }
                                        >
                                            {isAddingCall
                                                ? 'Adding...'
                                                : 'Add Selected Calls'}
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>

            {projectCalls.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projectCalls.map((call) => (
                            <TableRow key={call._id}>
                                <TableCell className="font-medium">
                                    {call.name}
                                </TableCell>
                                <TableCell>
                                    <DisplayDate date={call.createdAt} />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handleRemoveCall(call._id)
                                        }
                                        disabled={isRemovingCall === call._id}
                                        className="cursor-pointer"
                                    >
                                        <PhoneMissed className="mr-2 h-4 w-4" />
                                        {isRemovingCall === call._id
                                            ? 'Removing...'
                                            : 'Remove'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="text-center py-8 text-muted-foreground">
                    <PhoneCall className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>No calls assigned to this project yet.</p>
                    {availableCalls.length > 0 && (
                        <p className="text-sm mt-2">
                            Click &quot;Add Call&quot; to assign calls to this
                            project.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
