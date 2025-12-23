import { Stack, TextInput, Button } from "@mantine/core";

type Props = {
  isSubmitting: boolean;
  formRef?: React.RefObject<HTMLFormElement | null>;
  fetcher: any;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function LeadForm({
  isSubmitting,
  formRef,
  fetcher,
  handleFormSubmit,
}: Props) {
  return (
    <fetcher.Form ref={formRef} method="post" onSubmit={handleFormSubmit}>
      <Stack>
        <TextInput
          name="name"
          label="Name"
          required
          placeholder="John Doe"
          disabled={isSubmitting}
        />

        <TextInput
          name="email"
          label="Email"
          required
          placeholder="your@email.com"
          disabled={isSubmitting}
        />

        <TextInput
          name="phone"
          label="Phone"
          required
          placeholder="+91 98765 43210"
          disabled={isSubmitting}
        />

        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
          radius="md"
          style={{ fontWeight: 600 }}
        >
          {isSubmitting ? "Submitting..." : "Send Me Stock Idea"}
        </Button>
      </Stack>
    </fetcher.Form>
  );
}
