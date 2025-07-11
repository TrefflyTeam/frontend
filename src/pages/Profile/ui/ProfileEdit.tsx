import { DefaultUser } from "@/shared/icons/DefaultUser";
import { AdaptivePopover } from "@/shared/ui/AdaptivePopover";
import { FileUploadButton } from "@/shared/ui/FileUploadButton";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

import { useEditController } from "../controller/useEditController";

interface ProfileEdit {
  open: boolean;
  setOpen: (state: boolean) => void;
}

export const ProfileEdit = ({ open, setOpen }: ProfileEdit) => {
  const {
    form,
    handleClose,
    onSubmit,
    previewUrl,
    handleFileChange,
    handleImageDelete,
  } = useEditController({ setOpen });

  return (
    <AdaptivePopover
      open={open}
      setOpen={handleClose}
      header={
        <h1 className="text-primary text-3xl font-semibold text-center border-b-2 pb-2 border-outline-variant">
          Редактирование
        </h1>
      }
    >
      <div className="p-4">
        <div className="flex gap-4 items-center justify-center mb-4">
          {previewUrl ? (
            <img
              className="min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px] rounded-full object-fill bg-red-100"
              src={previewUrl}
            />
          ) : (
            <DefaultUser className="min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px]" />
          )}
          <div className="flex flex-col items-center gap1">
            <FileUploadButton
              handleChange={handleFileChange}
              variant="outline"
              className="rounded-4xl p-2 text-sm font-medium"
            />
            {previewUrl && (
              <Button
                type="button"
                variant="ghost"
                className="text-secondary text-xs font-semibold p-0"
                onClick={handleImageDelete}
              >
                Удалить фото
              </Button>
            )}
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="username"
                      autoComplete="name"
                      placeholder="Имя"
                      error={!!form.formState.errors.username}
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.username && (
                    <FormMessage>
                      {form.formState.errors.username.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            ></FormField>
            <Button
              type="submit"
              disabled={!form.formState.isValid}
              loading={form.formState.isSubmitting}
            >
              Сохранить
            </Button>
          </form>
        </Form>
      </div>
    </AdaptivePopover>
  );
};
