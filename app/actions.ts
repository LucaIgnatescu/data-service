"use server";

export async function createProject(prevState: any, formData: FormData) {
  console.log("SERVER ACTION CALLED!");
  console.log("Form data keys:", Array.from(formData.keys()));
  console.log("Creating project with data:", Object.fromEntries(formData));

  // Add your project creation logic here
  // For example:
  // - Validate the form data
  // - Save to database
  // - Return success/error response

  return { success: true };
}
