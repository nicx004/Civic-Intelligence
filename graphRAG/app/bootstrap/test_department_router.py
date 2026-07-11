from app.routing.department_router import DepartmentRouter


def main():
    complaint_id = "graphrag-test-1"

    router = DepartmentRouter()

    result = router.route(
        complaint_id=complaint_id,
    )

    print("\nDepartment routing result:")
    print(result)


if __name__ == "__main__":
    main()