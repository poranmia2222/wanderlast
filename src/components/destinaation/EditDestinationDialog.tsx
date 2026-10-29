"use client";
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PenLineIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";


import { toast } from "sonner";
import { PlusIcon, Trash2Icon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


const CATEGORIES = [
    { value: "beach", label: "Beach" },
    { value: "mountain", label: "Mountain" },
    { value: "historical", label: "Historical" },
    { value: "cultural", label: "Cultural" },
    { value: "culinary", label: "Culinary" },
] as const;

const EMPTY_FORM = {
    destinationName: "",
    country: "",
    category: "",
    price: "",
    duration: "",
    departureDate: "",
    imageUrl: "",
    description: "",
};

type FormState = typeof EMPTY_FORM;

/** A destination as returned by the API. `price` may arrive as a number. */
export type Destination = {
    destinationName: string;
    country: string;
    category: string;
    price: number | string;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
    _id: string;
};

type EditableForm = Omit<Destination, "_id">;



const EditDestinationDialog = ({
  destination,
}: {
  destination: Destination;
}) => {

    const [form, setForm] = useState<EditableForm>(destination);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setField = (field: keyof FormState, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch(`http://localhost:8000/destination/${destination._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                throw new Error(`Request failed with status ${res.status}`);
            }

            await res.json();
            toast.success("Travel package added", {
                description: `${form.destinationName} is now listed.`,
            });
            setForm(EMPTY_FORM);
        } catch {
            toast.error("Failed to add travel package", {
                description: "Something went wrong. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setForm(EMPTY_FORM);
    };

    return (
        <Dialog>
            <DialogTrigger
                render={
                    <Button className="flex items-center gap-3 border p-2 rounded-xl" />
                }
            >
                <PenLineIcon width={20} height={20} className='' />
                Edit
            </DialogTrigger>
            <DialogContent className="min-w-120">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 flex flex-col gap-1.5">
                                <Label htmlFor="destinationName">Destination Name</Label>
                                <Input
                                    id="destinationName"
                                    name="destinationName"
                                    placeholder="Bali Paradise"
                                    value={form.destinationName}
                                    onChange={(e) => setField("destinationName", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="country">Country</Label>
                                <Input
                                    id="country"
                                    name="country"
                                    placeholder="Indonesia"
                                    value={form.country}
                                    onChange={(e) => setField("country", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    items={CATEGORIES}
                                    value={form.category || null}
                                    onValueChange={(value) => setField("category", (value as string) ?? "")}
                                >
                                    <SelectTrigger id="category" className="w-full font-normal">
                                        <SelectValue placeholder="Beach" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map((cat) => (
                                            <SelectItem key={cat.value} value={cat.value}>
                                                {cat.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="price">Price (USD)</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    min={0}
                                    placeholder="e.g., 1299"
                                    value={form.price}
                                    onChange={(e) => setField("price", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="duration">Duration</Label>
                                <Input
                                    id="duration"
                                    name="duration"
                                    placeholder="e.g., 7 Days/6 Nights"
                                    value={form.duration}
                                    onChange={(e) => setField("duration", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-span-2 flex flex-col gap-1.5">
                                <Label htmlFor="departureDate">Departure Date</Label>
                                <Input
                                    id="departureDate"
                                    name="departureDate"
                                    type="date"
                                    value={form.departureDate}
                                    onChange={(e) => setField("departureDate", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-span-2 flex flex-col gap-1.5">
                                <Label htmlFor="imageUrl">Image URL</Label>
                                <Input
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    value={form.imageUrl}
                                    onChange={(e) => setField("imageUrl", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-span-2 flex flex-col gap-1.5">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe the travel experience..."
                                    className="min-h-24 field-sizing-fixed"
                                    value={form.description}
                                    onChange={(e) => setField("description", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-span-2 mt-2 flex items-center justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    disabled={isSubmitting}
                                    onClick={handleCancel}
                                >
                                    <Trash2Icon className="text-destructive" />
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-brand text-brand-foreground hover:bg-brand/90 dark:bg-brand dark:text-brand-foreground dark:hover:bg-brand/90"
                                >
                                    <PlusIcon />
                                    {isSubmitting ? "Adding..." : "Add Travel Package"}
                                </Button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default EditDestinationDialog;